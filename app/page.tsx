'use client'
import { useState } from 'react'
import Image from 'next/image'
import './weather.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
        faLocationDot,
        faMagnifyingGlass,
        faWater,
        faWind,
} from '@fortawesome/free-solid-svg-icons'

type Result = {
        base?: string
        clouds?: Object
        cod: number | string
        coord?: WeatherCoord
        dt?: number
        id?: number
        main?: WeatherMain
        name?: string
        sys?: WeaterGeo
        timezone?: number
        visibility?: number
        weather?: WeatherArray[]
        wind?: WeatherWind
}

type WeatherCoord = {
        lat: number
        lon: number
}
type WeaterGeo = {
        country: string
        id: number
        sunrise: number
        sunset: number
        type: number
}
type WeatherMain = {
        feels_like: number
        grnd_level: number
        humidity: number
        pressure: number
        sea_level: number
        temp: number
        temp_max: number
        temp_min: number
}
type WeatherArray = {
        description: string
        icon: string
        id: number
        main: string
}
type WeatherWind = {
        deg: number

        speed: number
}
export default function Home() {
        const [city, setCity] = useState('')
        const [empty, setEmpty] = useState(false)
        const [result, setResult] = useState({} as Result)
        const [resultCode, setResultCode] = useState('')
        const [weatherImg, setWeatherImg] = useState('')
        const [temperature, setTemperature] = useState('')
        const [desc, setDesc] = useState('')
        const [humidity, setHumidity] = useState('')
        const [wind, setWind] = useState('')
        const reset = () => {
                setCity('')
                setResultCode('')
                setWeatherImg('')
                setHumidity('')
                setWind('')
        }

        const handleOnKeyPress = (e: any) => {
                if (e.key === 'Enter') {
                        handleSearch() // Enter 입력이 되면 클릭 이벤트 실행
                }
        }

        const apiUrl =
                'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' +
                process.env.NEXT_WEATHER_APIKEY +
                '&q='
        const handleSearch = () => {
                console.log(city)
                if (city.length < 1) {
                        setEmpty(true)
                        setTimeout(() => {
                                setEmpty(false)
                        }, 1500)
                        return false
                } else {
                        fetch(apiUrl + city)
                                .then((response) => response.json())
                                .then((json) => {
                                        setResult(json)
                                        console.log(result)
                                        if (result.weather) {
                                                switch (
                                                        result.weather[0].main
                                                ) {
                                                        case 'Clear':
                                                                setWeatherImg(
                                                                        '/images/clear'
                                                                )
                                                                break
                                                        case 'Clouds':
                                                                setWeatherImg(
                                                                        '/images/cloud'
                                                                )
                                                                break
                                                        case 'Mist':
                                                                setWeatherImg(
                                                                        '/images/mist'
                                                                )
                                                                break
                                                        case 'Rain':
                                                                setWeatherImg(
                                                                        '/images/rain'
                                                                )
                                                                break
                                                        case 'Snow':
                                                                setWeatherImg(
                                                                        '/images/snow'
                                                                )
                                                                break
                                                        default:
                                                                setWeatherImg(
                                                                        ''
                                                                )
                                                }
                                        }
                                        setTimeout(() => {
                                                setResultCode(
                                                        json.cod.toString()
                                                )
                                        }, 1000)

                                        console.log(resultCode)
                                })
                }

                //결과 처리

                if (resultCode == '404') {
                        setTimeout(() => {
                                reset()
                        }, 1500)
                } else if (resultCode == '200') {
                        setTemperature(result.main?.temp + '℃')
                        if (result.weather)
                                setDesc(result.weather[0].description)
                        setHumidity(result.main?.humidity + '%')
                        setWind(result.wind?.speed + 'km/h')
                }
        }
        return (
                <div
                        className={`container relative w-[400px]  bg-white py-[28px] px-[32px] overflow-hidden rounded-[18px] 
                        ${empty ? 'animate-bounce' : ''}   
                        ${
                                resultCode === '200'
                                        ? 'h-[605px]'
                                        : resultCode === '400'
                                        ? 'h-[455px]'
                                        : 'h-[105px]'
                        }   
                        `}>
                        <div
                                className="search-box w-full min-h-min 
                        flex items-center justify-center text-[28px]">
                                <FontAwesomeIcon
                                        icon={faLocationDot}
                                        // className="absolute text-primary text-[28px]"
                                />
                                <input
                                        type="text"
                                        value={city}
                                        onChange={(e: any) => {
                                                e.preventDefault()
                                                setCity(
                                                        e.target
                                                                ?.value as string
                                                )
                                        }}
                                        onFocus={reset}
                                        onKeyPress={handleOnKeyPress}
                                        placeholder="Enter your location"
                                        className="text-primary w-[80%] text-[24px] font-medium uppercase pl-[32px] 
                placeholder:text-[20px]  placeholder:text-primary  placeholder:font-medium placeholder:capitalize
                "
                                />
                                <button
                                        className="cursor-pointer w-[50px] h-[50px] bg-secondary rounded-full text-[22px]
                                transition duration-500 ease-linear
                                hover:bg-primary hover:text-white"
                                        onClick={handleSearch}>
                                        <FontAwesomeIcon
                                                icon={faMagnifyingGlass}
                                        />
                                </button>
                        </div>
                        <div
                                className={`not-found w-full text-center mt-[30px]   ${
                                        resultCode == '404'
                                                ? 'animate-fadeIn'
                                                : 'scale-0 opacity-0 hidden'
                                }`}>
                                <div className="w-[70%] mt-[10px] mx-auto">
                                        <Image
                                                src="/images/page-not-found.jpg"
                                                alt="404"
                                                width={600}
                                                height={600}
                                                style={{ objectFit: 'contain' }}
                                                loading="lazy"
                                        />
                                </div>
                                <p className="text-primary text-[22px] font-medium mt-[30px]">
                                        Oops! Invalid location :/
                                </p>
                        </div>
                        <div
                                className={`weather-box text-center  ${
                                        resultCode == '200'
                                                ? 'animate-fadeIn block'
                                                : 'scale-0 opacity-0 hidden'
                                }`}>
                                <div className="w-[60%] mx-auto mt-[30px]">
                                        {resultCode == '200' &&
                                                weatherImg.length > 0 && (
                                                        <Image
                                                                src={
                                                                        weatherImg +
                                                                        '.PNG'
                                                                }
                                                                alt="Weather"
                                                                width={600}
                                                                height={600}
                                                                style={{
                                                                        objectFit: 'contain',
                                                                }}
                                                                priority={false}
                                                        />
                                                )}
                                </div>
                                <p className="temperature text-primary text-[4rem] font-extrabold mt-[30px] -ml-[16px]">
                                        {temperature}
                                </p>
                                <p className="description text-primary text-[22px] capitalize">
                                        {desc}
                                </p>
                        </div>
                        <div
                                className={`weather-details w-full  justify-between mt-[30px]   ${
                                        resultCode == '200'
                                                ? 'flex animate-fadeIn'
                                                : 'scale-0 opacity-0 hidden'
                                }`}>
                                <div className="humidity flex items-center w-[50%] h-[100px] pl-[20px] justify-start">
                                        <FontAwesomeIcon
                                                icon={faWater}
                                                className="text-primary text-[26px] mr-[10px] mt-[6px]"
                                        />
                                        <div className="text text-primary font-medium">
                                                <span className="text-[22px] ">
                                                        {humidity}
                                                </span>
                                                <p className="text-[14px] ">
                                                        Humidity
                                                </p>
                                        </div>
                                </div>
                                <div className="wind flex items-center w-[50%] h-[100px] pr-[20px] justify-end">
                                        <FontAwesomeIcon
                                                icon={faWind}
                                                className="text-primary text-[26px] mr-[10px] mt-[6px]"
                                        />
                                        <div className="text text-primary font-medium">
                                                <span className="text-[22px] ">
                                                        {wind}
                                                </span>
                                                <p className="text-[14px] ">
                                                        Wind Speed
                                                </p>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}
