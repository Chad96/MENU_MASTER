document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    fetch("https://formspree.io/f/xdoqyzgk", {
      method: "POST",
      body: new FormData(this),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you for your message!");
          this.reset();
        } else {
          alert("There was a problem submitting your form.");
        }
      })
      .catch((error) => {
        alert("There was a problem submitting your form.");
      });
  });
