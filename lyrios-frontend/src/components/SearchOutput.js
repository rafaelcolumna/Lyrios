import React from 'react';
import YouTube from 'react-youtube'
const baseURL = 'https://www.googleapis.com/youtube/v3';
const search = '/search?part=snippet';
const maxResult = '&maxResults=12';
const keyWord = '&q=rihanna';
const type = '&type=video';
//API Key 1
// const key = '&key=AIzaSyD5inzevVk7CDg0ipn9yBTXWP_TtekfF0A'; 
//API Key 2
const key = '&key=AIzaSyAlEKircfin7Ratd0qMcJT50yknQLgk67c';
const topicId = '&topicId=04rlf'
const URL = `${baseURL}${search}${maxResult}${type}${key}${topicId}${keyWord}`;
    



const SearchOutput = (youtubeData) => {
    console.log(youtubeData)
    return(
       <div>
            
            {/* <YouTube videoId= {youtubeData.results.items[0].id.videoId} /> */}
            <div className = 'videoMap'>
            {youtubeData ?   <>     
            {youtubeData.results.items.map((value, index)=>{
                console.log(value)
                return(
                    <div className = 'videoItem'>
                       <h4 className = 'videoTitle'>{value.snippet.title}</h4>  <YouTube videoId= {value.id.videoId} className = 'videoIndex'/>
            
                    </div>
                )

            })}</> : <p>Please submit a search request.</p>
            }  
            </div> 
        </div>
      
    )

}

    


export default SearchOutput