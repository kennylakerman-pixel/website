document.addEventListener('DOMContentLoaded', () => {
    
    // ===========================================
    // 1. TÍNH NĂNG ĐIỀU HƯỚNG MƯỢT MÀ
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ===========================================
    // 2. TÍNH NĂNG GỌI API - POKÉAPI: KHỞI TẠO BIẾNN
    // ===========================================
    const fetchPokeBtn = document.querySelector('#fetch-poke-btn'); 
    const pokeIdInput = document.querySelector('#poke-id');         
    const pokemonDataDisplay = document.querySelector('#pokemon-data'); 

    const randomPokeBtn = document.querySelector('#random-poke-btn');

    const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

    // Log kiểm tra Nút đã được tìm thấy (PHẢI XUẤT HIỆN)
    console.log("Nút Tra Cứu đã được tìm thấy:", fetchPokeBtn);


    // ===========================================
    // 3. CÁC HÀM XỬ LÝ API (Định nghĩa)
    // ===========================================

    /**
     * Hàm hiển thị dữ liệu Pokémon lên HTML
     */
    function displayPokemonData(pokemon) {
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const types = pokemon.types.map(typeInfo => 
            typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)
        ).join(', ');
        const spriteUrl = pokemon.sprites.front_default;

        const htmlContent = `
            <div class="pokemon-result">
                <img src="${spriteUrl}" alt="${name}" style="width: 96px; height: 96px;">
                <h3>#${pokemon.id} - ${name}</h3>
                <p><strong>Loại (Type):</strong> ${types}</p>
                <p><strong>Chiều cao:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Cân nặng:</strong> ${pokemon.weight / 10} kg</p>
            </div>
        `;
        pokemonDataDisplay.innerHTML = htmlContent;
    }


    /**
     * Hàm bất đồng bộ (async) để lấy dữ liệu Pokémon từ API
     */
    async function fetchPokemonData(id) {
        if (id < 1 || id > 1025) {
            pokemonDataDisplay.innerHTML = `<p style="color: red;">ID Pokémon phải nằm trong khoảng 1 đến 1025.</p>`;
            return;
        }

        pokemonDataDisplay.innerHTML = `<p>Đang tải dữ liệu của Pokémon ID: ${id}...</p>`;

        try {
            const response = await fetch(`${POKEAPI_BASE_URL}${id}`);
            
            if (!response.ok) {
                throw new Error(`Không tìm thấy Pokémon với ID: ${id}`);
            }
            
            const data = await response.json();
            displayPokemonData(data);

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu Pokémon:', error);
            pokemonDataDisplay.innerHTML = `<p style="color: red;">Đã xảy ra lỗi: ${error.message}</p>`;
        }
    }

// ... (Đặt hàm này cùng chỗ với hàm fetchPokemonData của bạn)

/**
 * Hàm tạo ID Pokémon ngẫu nhiên từ 1 đến 1025
 * 
 * Cập nhật input và gọi hàm fetchPokemonData
 */
function fetchRandomPokemon() {
    // Math.random() tạo số từ 0 đến < 1
    // * 151 tạo số từ 0 đến < 151
    // + 1 tạo số từ 1 đến < 152
    // Math.floor làm tròn xuống, đảm bảo ID từ 1 đến 151
    const randomId = Math.floor(Math.random() * 1025) + 1; 

    console.log(`Đang tra cứu Pokémon ID ngẫu nhiên: ${randomId}`);
    
    // 1. Cập nhật giá trị trong ô input để người dùng thấy ID
    pokeIdInput.value = randomId; 
    
    // 2. Gọi hàm tra cứu chính
    fetchPokemonData(randomId);
}

    // ===========================================
    // 4. XỬ LÝ SỰ KIỆN NÚT BẤM VÀ KHỞI TẠO TỰ ĐỘNG
    // ===========================================

    // Gắn sự kiện click
    if (fetchPokeBtn) {
        console.log("Listener đã được gắn.");
        fetchPokeBtn.addEventListener('click', () => {
            console.log("NÚT ĐÃ KÍCH HOẠT!"); // Dòng này PHẢI xuất hiện khi bấm nút
            const pokeId = parseInt(pokeIdInput.value); 
            fetchPokemonData(pokeId);
        });
    } else {
        console.error("LỖI CUỐI CÙNG: Không tìm thấy ID 'fetch-poke-btn'.");
    }

    if (randomPokeBtn) {
    randomPokeBtn.addEventListener('click', () => {
        fetchRandomPokemon();
    });
}
    // Tự động load Pokémon ID 1
    fetchPokemonData(1);

    // Thay thế YOUR_OPENWEATHERMAP_API_KEY_HERE bằng API Key của bạn
const WEATHER_API_KEY = '7f97aecd9b5ef20b7e20b87c95a0f97b';
// Mã thành phố cho TP.HCM: 1566083
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?id=1566083&appid=${WEATHER_API_KEY}&units=metric&lang=vi`;

// Hàm lấy và hiển thị thời tiết
async function fetchWeatherData() {
    const weatherDataDisplay = document.querySelector('#weather-data');
    
    if (!weatherDataDisplay) return; // Bảo vệ nếu phần tử HTML không tồn tại

    try {
        const response = await fetch(WEATHER_URL);
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu thời tiết.');
        }
        
        const data = await response.json();
        const temp = data.main.temp.toFixed(1);
        const description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherDataDisplay.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${iconUrl}" alt="${description}" style="width: 50px; height: 50px;">
                <div>
                    <p style="font-size: 2rem; font-weight: 700; color: #007bff;">${temp}°C</p>
                    <p>${description}</p>
                    <p style="font-size: 0.9rem; color: #6c757d;">Cập nhật lúc: ${new Date().toLocaleTimeString('vi-VN')}</p>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Lỗi thời tiết:", error);
        weatherDataDisplay.innerHTML = `<p style="color: red;">Không thể tải dữ liệu thời tiết. Vui lòng kiểm tra API Key.</p>`;
    }
}

// Gọi hàm lần đầu khi tải trang
fetchWeatherData(); 

// Thiết lập tự động cập nhật sau mỗi 10 phút (600000 ms)
setInterval(fetchWeatherData, 600000);


// Thay thế YOUR_EXCHANGE_RATE_API_KEY_HERE bằng API Key của bạn
const EXCHANGE_RATE_API_KEY = '858925287952771218aabb05'; 
const EXCHANGE_RATE_URL = `https://v6.exchangerate-api.com/v6/858925287952771218aabb05/latest/USD`;

// Hàm lấy và hiển thị tỷ giá
async function fetchExchangeRate() {
    const exchangeRateDataDisplay = document.querySelector('#exchange-rate-data');
    
    if (!exchangeRateDataDisplay) return; 

    try {
        const response = await fetch(EXCHANGE_RATE_URL);
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu tỷ giá.');
        }
        
        const data = await response.json();
        // Lấy tỷ giá VND từ đối tượng rates
        const vndRate = data.conversion_rates.VND.toLocaleString('vi-VN'); 

        exchangeRateDataDisplay.innerHTML = `
            <div style="font-size: 1.5rem; font-weight: 700; color: #28a745;">
                1 USD = ${vndRate} VND
            </div>
            <p style="font-size: 0.9rem; color: #6c757d; margin-top: 10px;">Cập nhật: ${new Date().toLocaleTimeString('vi-VN')}</p>
        `;

    } catch (error) {
        console.error("Lỗi tỷ giá:", error);
        exchangeRateDataDisplay.innerHTML = `<p style="color: red;">Không thể tải tỷ giá. Vui lòng kiểm tra API Key.</p>`;
    }
}

// Gọi hàm lần đầu khi tải trang
fetchExchangeRate(); 

// Thiết lập tự động cập nhật sau mỗi 1 giờ (3600000 ms)
setInterval(fetchExchangeRate, 3600000);

});