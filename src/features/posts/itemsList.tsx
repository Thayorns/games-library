import React from "react"
import { Link } from "react-router-dom"
import { Spin } from 'antd'
import { useGetGamesQuery } from "../api/apiSlice"
import { useEffect, useState } from "react"
import { Button, FloatButton, Popover, Carousel } from 'antd'

const ItemsList = () => {
  const [pageSize, setPageSize] = useState(10)
  const { data: games, isLoading, isSuccess, isError, error, refetch } = useGetGamesQuery({ pageSize, page: 1 })
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
  // кондиции для отрисовки
  if (isLoading) {
    content = <Spin />
  } else if (isSuccess) {
    
    content = games.results.map((item: mappedGame, index: number) => {
    
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
          {/* <span># {item.id}</span> */}
          <h2>{item.name}</h2>
          <span><strong>rating {item.rating} </strong></span>
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

  return (
    <section>
      <h1>Игры</h1>
      <ol>
        <div className="sort-div">
          <select className="platfotm" onChange={(e) => setPlatform(e.target.value)}>
            <option>PC</option>
            <option>PS-5</option>
            <option>PS-4</option>
            <option>PS-3</option>
            <option>Xbox Series S/X</option>
            <option>Xbox 360</option>
            <option>macOS</option>
            <option>Nintendo Switch</option>
            <option>Linux</option>
          </select>
          <select className="single-mmo" onChange={(e) => setGameType(e.target.value)}>
            <option>singleplayer</option>
            <option>multiplayer</option>
            <option>co-op</option>
          </select>
          <select className="rating" onChange={(e) => setRating(e.target.value)}>
            <option> &lt;4 rate</option>
            <option> &gt;4 rate</option>
          </select>
          <select className="ru" onChange={(e) => setLanguage(e.target.value)}>
            <option>ru</option>
            <option>eng</option>
          </select>
        </div>
        {content}
        {/* <button className={isLoading ? 'active-none' : 'active'} onClick={handleClick}>Load more games</button> */}
        {isFetching && (<ul className="newposts-loading">loading...</ul>)}
        <FloatButton.BackTop />
      </ol>
    </section>
  )
  }
  
  export default ItemsList