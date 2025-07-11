const top50brands = ["Toyota", "Ford", "Chevrolet", "Honda", "Nissan", "Jeep", "Hyundai", "Kia", "Ram", "Subaru", "GMC", "Volkswagen", "BMW", "Mazda", "Mercedes-Benz", "Lexus", "Tesla", "Dodge", "Audi", "Buick", "Acura", "Volvo", "Cadillac", "Chrysler", "Mitsubishi", "Land Rover", "Lincoln", "Porsche", "Infiniti", "Genesis", "Mini", "Maserati", "Alfa Romeo", "Jaguar", "Bentley", "Ferrari", "Lamborghini", "Aston Martin", "PoleStar", "Fiat", "Rolls-Royce", "McLaren", "Lucid", "Bugatti", "Lotus", "Rivian", "Canoo", "Pontiac", "Oldsmobile", "Rimac"]
const brand = document.getElementById("brandsel");
const model = document.getElementById("modelsel");
const yr = document.getElementById("yearsel");
const brand2 = document.getElementById("brandsel2");
const model2 = document.getElementById("modelsel2");
const yr2 = document.getElementById("yearsel2");
let htmlModelList = "<option>Select a model</option>";
let brandSelect = "";
let htmlBrandList = "<option>Select a brand</option>";
let htmlModelList2 = "<option>Select a model</option>";
let brandSelect2 = "";
let htmlBrandList2 = "<option>Select a brand</option>";
let htmlYearList = "<option>Select a year</option>";
let htmlYearList2 = "<option>Select a year</option>";
const hiddenResult = document.getElementById("hidden");


for (let i = 0; i < top50brands.length; i++) {
    htmlBrandList += `<option>${top50brands[i]}</option>`;
    htmlBrandList2 += `<option>${top50brands[i]}</option>`;
}
brand.innerHTML = htmlBrandList;
brand2.innerHTML = htmlBrandList2;
model.innerHTML = htmlModelList;
model2.innerHTML = htmlModelList2;
yr.innerHTML = htmlYearList;
yr2.innerHTML = htmlYearList2;

function resetmodel() {
    model.innerHTML = "<option>Select a model</option>";
    htmlModelList = "";
}

function resetyr() {
    yr.innerHTML = "<option>Select a year</option>";
    htmlYearList = "";
}


function resetmodel2() {
    model2.innerHTML = "<option>Select a model</option>";
    htmlModelList2 = "";
}

function resetyr2() {
    yr2.innerHTML = "<option>Select a year</option>";
    htmlYearList2 = "";
}

brand.addEventListener("change", function (e) {
    resetmodel();
    resetyr();
    brandSelect = e.target.value;
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${brandSelect}?format=json`)
        .then(res => res.json())
        .then(data => {
            const apiModelList = data.Results;
            for (let i = 0; i < apiModelList.length; i++) {
                htmlModelList += `<option>${apiModelList[i].Model_Name}</option>`
            }
            model.innerHTML += htmlModelList;
        }).catch(error => console.error("Fetch error:", error));
})

brand2.addEventListener("change", function (e) {
    resetmodel2();
    resetyr2();
    brandSelect2 = e.target.value;
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${brandSelect2}?format=json`)
        .then(res => res.json())
        .then(data => {
            const apiModelList2 = data.Results;
            for (let i = 0; i < apiModelList2.length; i++) {
                htmlModelList2 += `<option>${apiModelList2[i].Model_Name}</option>`
            }
            model2.innerHTML += htmlModelList2;
        }).catch(error => console.error("Fetch error:", error));
})

model.addEventListener("change", async function (e) {
    resetyr();
    const modelSelect = e.target.value;
    const dateToday = new Date().getFullYear();
    // Create all promises at once (runs in parallel)
    const yearPromises = [];
    for (let year = 2024; year < dateToday; year++) {
        const promise = fetch(`https://api.api-ninjas.com/v1/cars?make=${brandSelect}&model=${modelSelect}&year=${year}`, {
            headers: {
                'X-Api-Key': 'qp0j4GwpPvKFesSIujiVpA==7BSQTPoCk3aUUj7Q'
            }
        })
            .then(res => res.json())
            .then(data => {
                return data.length > 0 ? year : null; // Return year if data exists, null otherwise
            })
            .catch(error => {
                console.error(`Error for year ${year}:`, error);
                return null;
            });

        yearPromises.push(promise);
    }

    // Wait for ALL requests to finish
    const results = await Promise.all(yearPromises);

    // Filter out nulls and sort
    const availableYears = results.filter(year => year !== null).sort((a, b) => a - b);

    // Update dropdown
    if (availableYears.length > 0) {
        for (let year of availableYears) {
            htmlYearList += `<option>${year}</option>`;
        }
        yr.innerHTML += htmlYearList;
    } else {
        yr.innerHTML = `<option>No Years Available</option>`;
    }
});


model2.addEventListener("change", async function (e) {
    resetyr2();
    const modelSelect2 = e.target.value;
    const dateToday2 = new Date().getFullYear();

    // Create all promises at once (runs in parallel)
    const yearPromises2 = [];
    for (let year2 = 2024; year2 < dateToday2; year2++) {
        const promise2 = fetch(`https://api.api-ninjas.com/v1/cars?make=${brandSelect2}&model=${modelSelect2}&year=${year2}`, {
            headers: {
                'X-Api-Key': 'qp0j4GwpPvKFesSIujiVpA==7BSQTPoCk3aUUj7Q'
            }
        })
            .then(res => res.json())
            .then(data => {
                return data.length > 0 ? year2 : null; // Return year if data exists, null otherwise
            })
            .catch(error => {
                console.error(`Error for year ${year2}:`, error);
                return null;
            });

        yearPromises2.push(promise2);
    }

    // Wait for ALL requests to finish
    const results2 = await Promise.all(yearPromises2);

    // Filter out nulls and sort
    const availableYears2 = results2.filter(year2 => year2 !== null).sort((a, b) => a - b);

    // Update dropdown
    if (availableYears2.length > 0) {
        for (let year2 of availableYears2) {
            htmlYearList2 += `<option>${year2}</option>`;
        }
        yr2.innerHTML += htmlYearList2;
    } else {
        yr2.innerHTML = `<option>No Years Available</option>`;
    }
});


const navbtn = document.querySelectorAll(".selection");
navbtn.forEach(link => {
    link.addEventListener("click", function (e) {
        navbtn.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    })
})

function isValidSelection() {
    if (brand.value != "Select a brand" && brand2.value != "Select a brand"
        && model.value != "Select a model" && model2.value != "Select a model"
        && yr.value != "Select a year" && yr2.value != "Select a year"
        && yr.value != "No Years Available" && yr2.value != "No Years Available") {
        return true;
    }
    else return false;
}

const srbtn = document.querySelector("#btn");
srbtn.disabled = true;
const allSelection = [yr, yr2, model, model2, brand, brand2];

allSelection.forEach(year => {
    year.addEventListener("change", function () {
        if (isValidSelection()) {
            srbtn.disabled = false;
        }
        else {
            srbtn.disabled = true;
        }
    })
})

srbtn.addEventListener("click", function () {
    hiddenResult.style.display = "block";
    Promise.all([fetch(`https://api.api-ninjas.com/v1/cars?make=${brand.value}&model=${model.value}&year=${yr.value}`, {
        headers: {
            'X-Api-Key': 'qp0j4GwpPvKFesSIujiVpA==7BSQTPoCk3aUUj7Q'
        }
    }), fetch(`https://api.api-ninjas.com/v1/cars?make=${brand2.value}&model=${model2.value}&year=${yr2.value}`, {
        headers: {
            'X-Api-Key': 'qp0j4GwpPvKFesSIujiVpA==7BSQTPoCk3aUUj7Q'
        }
    })
    ])
        .then(async ([res, res2]) => {

            const data = await res.json();
            const data2 = await res2.json();

            const cy = document.getElementById("cy");
            const cy2 = document.getElementById("cy2");
            const category = document.getElementById("category");
            const category2 = document.getElementById("category2");
            const dr = document.getElementById("dr");
            const dr2 = document.getElementById("dr2");
            const fuel = document.getElementById("fuel");
            const fuel2 = document.getElementById("fuel2");
            const trans = document.getElementById("trans");
            const trans2 = document.getElementById("trans2");

            switch (data[0].drive) {
                case "fwd":
                    dr.innerHTML = `Forward-wheel drive`;
                    break;
                case "rwd":
                    dr.innerHTML = "Rear-wheel drive";
                    break;
                case "awd":
                    dr.innerHTML = "All-wheel drive";
                    break;
                case "4wd":
                    dr.innerHTML = "Four-wheel drive";
                    break;
                default:
                    dr.innerHTML = data[0].drive;
            }
            switch (data2[0].drive) {
                case "fwd":
                    dr2.innerHTML = `Forward-wheel drive`;
                    break;
                case "rwd":
                    dr2.innerHTML = "Rear-wheel drive";
                    break;
                case "awd":
                    dr2.innerHTML = "All-wheel drive";
                    break;
                case "4wd":
                    dr2.innerHTML = "Four-wheel drive";
                    break;
                default:
                    dr2.innerHTML = data2[0].drive;
            }
            switch (data[0].transmission) {
                case "a":
                    trans.innerHTML = "Automatic";
                    break;
                case "m":
                    trans.innerHTML = "Manual";
                    break;
                default:
                    trans.innerHTML = data[0].transmission;
            }
            switch (data2[0].transmission) {
                case "a":
                    trans2.innerHTML = "Automatic";
                    break;
                case "m":
                    trans2.innerHTML = "Manual";
                    break;
                default:
                    trans2.innerHTML = data2[0].transmission;
            }


            cy.innerHTML = data[0].cylinders;
            category.innerHTML = data[0].class.charAt(0).toUpperCase() + data[0].class.slice(1);
            fuel.innerHTML = data[0].fuel_type.charAt(0).toUpperCase() + data[0].fuel_type.slice(1);

            cy2.innerHTML = data2[0].cylinders;
            category2.innerHTML = data2[0].class.charAt(0).toUpperCase() + data2[0].class.slice(1);
            fuel2.innerHTML = data2[0].fuel_type.charAt(0).toUpperCase() + data2[0].fuel_type.slice(1);
        })

})


