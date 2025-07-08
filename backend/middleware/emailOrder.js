function generateOrderHTML({ orderInfo, products, name, date, total, status }) {
  const address = orderInfo[0]?.address;
  const city = orderInfo[0]?.city;
  const pincode = orderInfo[0]?.pincode;
  const country = orderInfo[0]?.country;

  const productList = products
    .map((product) => {
      const productName = product?.productId?.name;
      const quantity = product?.quantity;
      const price = product?.productId?.price;
      const size = product?.size;
      const color = product?.color;

      return `
        <div>
          <div>
            <p><strong>${productName}</strong></p>
            <p>Quantity:<strong> ${quantity}</strong></p>
            <p>Size: <strong>${size}</strong></p>
            <p>Color:<strong> ${color}</strong></p>
            <p>Price: <strong>₹${price}</strong></p>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div>
      <div>
        <h2>🧾 Thank you for your order, ${name}!</h2>
        <p>Order placed on: <strong>${date}</strong></p>
        <p><strong>Shipping to:</strong> ${address}, ${city}, ${pincode}, ${country}</p>
        <hr/>
        ${productList}
        <hr/>
        <p><strong>Total:</strong> ₹${total}</p>
        <p>Your Order Status is:<h1 style="color: red;">${status}</h1></p>

        <p>We’ll notify you once your items are shipped.</p>
        <p>Thank you for shopping with us!</p>
        <div>
          This is an automated email. Please do not reply.
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  generateOrderHTML,
};
