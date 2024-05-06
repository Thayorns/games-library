import React from "react"
import { Link } from "react-router-dom"
import { Spin } from 'antd'
import { useGetGamesQuery } from "../api/apiSlice"
import { useEffect, useState } from "react"
import { Button, FloatButton, Popover, Carousel } from 'antd'

const ItemsList = () => {
  const [pageSize, setPageSize] = useState(50)
  const { data: games, isLoading, isSuccess, isError, error, refetch } = useGetGamesQuery({ pageSize, start: 0 })
  // const [newGames, setNewGames] = useState<any[]>([])
  const [isFetching, setIsFetching] = useState(false)
  // инициализируем состояния для селектов
  const [platform, setPlatform] = useState('')
  const [gameType, setGameType] = useState('')
  const [rating, setRating] = useState('')
  const [language, setLanguage] = useState('')
  let content
  console.log(games);
  
  
  // const handleClick = (e: any) => {
  //   if(e.type === 'click'){ //e.type
  //     setLimit((prevLimit) => prevLimit + 5)
  //     setNewGames(
  //       (prevNewGames) => [...prevNewGames, ...games.results]//useState<any[]>
  //     )
  //     setIsFetching(true)
  //   }
  // }
  
  // рефетчим данные 
  useEffect(() => {
    if (!isFetching) return
    refetch().unwrap().then(() => {
      setIsFetching(false)
    })
  }, [isFetching, games, refetch])
  
  // инициализируем типы для отрисовки игр в соответствии с rawg.io
  
  type Tag = {
    name: 'Singleplayer' | 'Multiplayer' | 'Co-op'
    language: 'eng' | 'ru'
  }
  type ImagesScreenshot = {
    image: string
  }
  const contentStyle: React.CSSProperties = {
    height: '260px',
    lineHeight: '160px',
    textAlign: 'center',
  }
  type Platform = {
    name: string
  }
  type PlatformItem = {
    platform: Platform
  }
  type mappedGame = {
    id: number
    name: string
    platforms: PlatformItem[]
    tags: Tag[]
    short_screenshots: ImagesScreenshot[]
    rating: number
    background_image: string
  }
  const filterGamesByCriteria = (games:any, platform:string, gameType:string, rating:string, language:string) => {
    return games.filter((game:any) => {
      return (
        (!platform || game.platforms.some((platformItem: any) => platformItem.platform.name.toLowerCase() === platform.toLowerCase())) &&
        (!gameType || game.tags.some((tag:any) => tag.name.toLowerCase() === gameType.toLowerCase())) &&
        (!rating || (rating === '>4 rate' ? game.rating > 4 : game.rating < 4)) &&
        (!language || game.tags.some((tag:any) => tag.language.toLowerCase() === language.toLowerCase()))
      );
    });
  };
  // кондиции для отрисовки
if (isLoading) {
  content = <Spin />
} else if (isSuccess) {
  const filteredGames = filterGamesByCriteria(games.results, platform, gameType, rating, language)
    
  content = filteredGames.map((item: mappedGame, index: number) => {
  
  const screenshotContent = (
    <Carousel autoplay>
      {item.short_screenshots.map((screenshotItem, screenshotIndex)=> (
        <div className="screenshots" style={contentStyle} key={screenshotIndex}>
          <img className="screenshots-img" src={screenshotItem.image} alt=""/>
        </div>
      ))}
    </Carousel>
  )
  
  return (
    <li className='li-container' key={index}>
      <Popover content={screenshotContent} title="Скриншоты" trigger="click">
        <img src={item.background_image} alt=""/>
      </Popover>
      <div className="div-content-container">
        <h2>{item.name}</h2>
        <span>
          <strong>
            rating {item.rating}
          </strong></span>
        <Link to={`/games/${item.id}`} className="button-view-post">
          <Button>описание</Button>
        </Link>
      </div>
      <div className="div-platforms">
        {item.platforms.map((platformItem, platformIndex) => (
          <span className="platform-item" key={platformIndex}>{platformItem.platform.name} |</span>
        ))} <br/>
        {item.tags.filter(tag => ['Singleplayer', 'Multiplayer', 'Co-op'].includes(tag.name)).map((tagsItem, tagsIndex) => 
          (
            <span className="platform-item" key={tagsIndex}>{tagsItem.name} |</span>
          ))}
      </div>
    </li>
  )})
  } else if (isError) {
    content = <div id="error-page">Что-то пошло не так.. {'message' in error ? error.message : ''}</div>//проверка на undefined
  }
  // эндпоинт рендер
  return (
    <section>
      <h1>Игры</h1>
      <ol>
        <div className="sort-div">
          <select className="platfotm" onChange={(e) => setPlatform(e.target.value)}>
            <option value=''>платформа</option>
            <option>PC</option>
            <option>PlayStation 5</option>
            <option>PlayStation 4</option>
            <option>PlayStation 3</option>
            <option>Xbox Series S/X</option>
            <option>Xbox 360</option>
            <option>macOS</option>
            <option>Nintendo Switch</option>
            <option>Linux</option>
          </select>
          <select className="single-mmo" onChange={(e) => setGameType(e.target.value)}>
            <option value=''>режимы</option>
            <option>Singleplayer</option>
            <option>Multiplayer</option>
            <option>Co-op</option>
          </select>
          <select className="rating" onChange={(e) => setRating(e.target.value)}>
            <option value=''>рейтинг</option>
            <option> &lt;4 rate</option>
            <option> &gt;4 rate</option>
          </select>
          <select className="ru" onChange={(e) => setLanguage(e.target.value)}>
            <option value=''>язык</option>
            <option>ru</option>
            <option>eng</option>
          </select>
        </div>
        {content}
        {/* <button className={isLoading ? 'active-none' : 'active'} onClick={handleClick}>Загрузить ещё</button> */}
        {isFetching && (<ul className="newposts-loading">Загрузка...</ul>)}
        <FloatButton.BackTop />
      </ol>
    </section>
  )
  }
  
  export default ItemsList