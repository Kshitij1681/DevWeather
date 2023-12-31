const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_val = document.getElementById("temp_val");
const temp_status = document.getElementById("temp_status");
const data_hide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();

  const search = cityName.value;

  if (search === "") {
    city_name.innerText = `Data Not Found, Try Something Else!`;
    data_hide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0ae8dac5f607d8773d5a6b5f9d737e1d`;
      const res = await fetch(url);
      const data = await res.json();
      //   console.log(data);
      const arrData = [data];
      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
      temp_val.innerText = (arrData[0].main.temp - 273).toFixed(2);

      //   condition to check temperature status or not
      let forecast = arrData[0].weather[0].main.toLowerCase();
      //   console.log("🚀 ~ file: main.js:28 ~ getInfo ~ forecast:", forecast);

      const tempMood = {
        clear: `<i class="fa-solid fa-sun" style="color: #eccc68;"></i>`,
        clouds: `<i class="fa-solid fa-cloud" style="color: #f1f2f6;"></i>`,
        rain: `<i class="fa-solid fa-cloud-rain" style="color: #a4b0be;"></i>`,
      };

      temp_status.innerHTML = tempMood[forecast] ? tempMood[forecast] : `<i class="fa-solid fa-sun" style="color: #eccc68;"></i>`;
      data_hide.classList.remove("data_hide");
    } catch (err) {
      console.log(err);
      city_name.innerText = `No Data Found!`;
      data_hide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
