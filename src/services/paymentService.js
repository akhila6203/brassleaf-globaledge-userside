import { initiateOrderPayment } from "./orderService";

export { initiateOrderPayment };

export async function openPaytmCheckout(payment, onSuccess, onFailure) {
  if (!payment?.txnToken || !payment?.mid) {
    throw new Error("Invalid Paytm payment session.");
  }

  const host =
    payment.host ||
    (payment.environment === "production"
      ? "https://securegw.paytm.in"
      : "https://securegw-stage.paytm.in");

  await loadPaytmScript(host, payment.mid);

  return new Promise((resolve, reject) => {
    const config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: payment.orderId,
        token: payment.txnToken,
        tokenType: "TXN_TOKEN",
        amount: payment.amountFormatted || String(payment.amount),
      },
      handler: {
        notifyMerchant(eventName) {
          if (eventName === "APP_CLOSED") {
            const error = new Error("Payment window closed.");
            onFailure?.(error);
            reject(error);
          }
        },
        transactionStatus(data) {
          if (data?.STATUS === "TXN_SUCCESS" || data?.status === "SUCCESS") {
            onSuccess?.(data);
            resolve(data);
            return;
          }

          const error = new Error(
            data?.RESPMSG || "Payment was not completed."
          );
          onFailure?.(error);
          reject(error);
        },
      },
    };

    if (!window.Paytm?.CheckoutJS) {
      const error = new Error("Paytm checkout script failed to load.");
      reject(error);
      return;
    }

    window.Paytm.CheckoutJS.init(config)
      .then(() => window.Paytm.CheckoutJS.invoke())
      .catch((error) => {
        onFailure?.(error);
        reject(error);
      });
  });
}

export async function payOrderWithPaytm(orderId, callbacks = {}) {
  const payment = await initiateOrderPayment(orderId);

  return openPaytmCheckout(
    payment,
    callbacks.onSuccess,
    callbacks.onFailure
  );
}

function loadPaytmScript(host, mid) {
  const merchantId = String(mid || "").trim();

  if (!merchantId) {
    return Promise.reject(new Error("Paytm merchant ID is missing."));
  }

  const src = `${host}/merchantpgpui/checkoutjs/merchants/${encodeURIComponent(
    merchantId
  )}/checkout.js`;

  const existing = document.querySelector(
    `script[data-paytm-checkout="${merchantId}"]`
  );

  if (existing && window.Paytm?.CheckoutJS) {
    return Promise.resolve();
  }

  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Unable to load Paytm checkout."))
      );
    });
  }

  document
    .querySelectorAll('script[data-paytm-checkout]')
    .forEach((node) => node.remove());

  delete window.Paytm;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.paytmCheckout = merchantId;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load Paytm checkout."));
    document.body.appendChild(script);
  });
}
