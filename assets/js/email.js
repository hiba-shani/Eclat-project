
emailjs.init("vpJkFdTsiW0p9rjGO");

// Send email function
function sendMail(product) {
    const params = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value,

        product_name: product.name,
        product_price: product.price,
        product_size: Array.isArray(product.sizes)
            ? product.sizes.join(", ")
            : (product.sizes || "No Size")
    };

    const serviceID = "service_skbe18w";           // Y service ID
    const mainTemplateID = "template_zke7iht";    // Template to send to admin
    const autoReplyTemplateID = "template_n8i1kfj"; // Template to send to user

    // 1 Send message to admin
    emailjs.send(serviceID, mainTemplateID, params)
        .then(() => {
            console.log("Message sent to admin successfully!");
        })
        .catch((err) => {
            console.error("Admin email error:", err);
            alert("Failed to send message to admin. Check console for details.");
        });

    //  Send auto-reply to user
    emailjs.send(serviceID, autoReplyTemplateID, params)
        .then(() => {
            alert("Message sent! Auto-reply sent to your email.");
            document.getElementById("contactForm").reset();
        })
        .catch((err) => {
            console.error("Auto-reply error:", err);
            alert("Message sent, but auto-reply failed. Check console for details.");
        });
}