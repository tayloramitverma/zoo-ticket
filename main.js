class Zoo {
  constructor() {
    this.personAge = [];
  }

  generateTicketNumber(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  renderAgeInput(count) {
    let ageContainer = "";
    for (let i = 1; i <= count; i++) {
      ageContainer += `<div class="mb-3">
        <label for="numberOfGuest" class="form-label"
        >Person ${i} Age</label
        >
        <input
        type="number"
        class="form-control"
        min="0"
        id="person_${i}_age"
        />
        </div>`;
    }
    return ageContainer;
  }

  getTicketCost(persons) {
    const ticketNumber = this.generateTicketNumber(5);
    let cost = 0;
    for (let i = 1; i <= persons; i++) {
      let age = document.getElementById(`person_${i}_age`).value;
      age = parseInt(age);
      if (age !== null) {
        if (age <= 2) {
          cost += 0;
        } else if (age > 2 && age < 18) {
          cost += 100;
        } else if (age >= 18 && age < 60) {
          cost += 500;
        } else if (age > 60) {
          cost += 300;
        }
        this.personAge.push({ ticketNumber, age, cost });
      }
    }

    return { cost, ticketNumber };
  }

  getTicketDetail(ticket) {
    return this.personAge.filter((item) => item.ticketNumber === ticket);
  }
}
(function () {
  const submitButton = document.getElementById("submitBtn");
  const resetButton = document.getElementById("resetBtn");
  const numberOfGuest = document.getElementById("numberOfGuest");
  const ageBox = document.getElementById("ageBox");
  const outputBox = document.getElementById("outputBox");

  const searchBtn = document.getElementById("searchBtn");
  const ticketInput = document.getElementById("ticketNumber");
  const searchResult = document.getElementById("searchResult");

  const zoo = new Zoo();

  //step 1
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (submitButton.value == 1 && numberOfGuest.value > 0) {
      ageBox.innerHTML = zoo.renderAgeInput(numberOfGuest.value);
      submitButton.value = 2;
      submitButton.innerText = "Submit";
    } else if (submitButton.value == 2) {
      const data = zoo.getTicketCost(numberOfGuest.value);
      outputBox.innerHTML = `Total Cost (INR): ${data.cost} \n Ticket No.: ${data.ticketNumber}`;
      outputBox.classList.remove("d-none");
      outputBox.classList.add("d-flex");
      submitButton.setAttribute("disabled", true);
    }
  });

  resetButton.addEventListener("click", function (e) {
    e.preventDefault();
    submitButton.value = 1;
    submitButton.innerText = "Next";
    ageBox.innerHTML = "";
    outputBox.innerHTML = "";
    outputBox.classList.remove("d-flex");
    outputBox.classList.add("d-none");
    submitButton.removeAttribute("disabled");
  });

  //setp 2
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (ticketInput.value) {
      const res = zoo.getTicketDetail(ticketInput.value);
      if (res) {
        let result = "";
        res.forEach((item, index) => {
          let guest = index + 1;
          result += `<p>Guest ${guest} (age: ${item?.age || 0})</p>`;
        });

        searchResult.innerHTML = result;
        searchResult.classList.remove("d-none");
        searchResult.classList.add("d-flex");
      }
    }
  });
})();
