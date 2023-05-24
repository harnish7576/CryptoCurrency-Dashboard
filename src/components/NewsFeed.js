import { useEffect, useState } from "react";
import axios from 'axios'

const NewsFeed = () =>  {
  const [articles, setArticles] = useState(0)

  useEffect(() => {
    
    

    const options = {
      method: 'GET',
      url: 'http://localhost:8000/news'
    };



    axios.request(options).then((response) => {
      console.log(response.data);
      setArticles(response.data)
    }).catch((error) =>{
      console.error(error);
    })
    
    
  }, [])

  console.log(articles[0])

  // const first7Articles = [articles[0], articles[1], articles[2], articles[3], articles[4], articles[5], articles[6]]
  const first3Articles = [articles[0], articles[1], articles[2]]
  
  
  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      <a href={first3Articles[0].url}><p>{first3Articles[0].title}</p></a>
      <a href={first3Articles[1].url}><p>{first3Articles[1].title}</p></a>
      <a href={first3Articles[2].url}><p>{first3Articles[2].title}</p></a>

      {/* {first3Articles?.map((article) => (
        <div>
          <a href={article.url}><p>{article.title}</p></a>
        </div>))} */}
    </div>
  )
}
  
  export default NewsFeed;