import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import YouTube from 'react-youtube'



function VideoOutput (props) {
//YouTube API Call
    const baseURL = 'https://www.googleapis.com/youtube/v3';
    const search = '/search?part=snippet';
    const maxResult = '&maxResults=12';
    const keyWord = '&q=rihanna';
    const type = '&type=video';
    //API Key 1
    // const key = '&key=AIzaSyD5inzevVk7CDg0ipn9yBTXWP_TtekfF0A'; 
    // API Key 2
    const key = '&key=AIzaSyAjtiGq13vuyxMjQfPS7Ngj0Mny-7ol3GM'
    //API Key 3
    // const key = '&key=AIzaSyAlEKircfin7Ratd0qMcJT50yknQLgk67c';
    const topicId = '&topicId=04rlf';
    
    const [youtubeData, setYoutubeData] = React.useState(null);
    const getYoutubeData = async (searchTerm) => {
        const response = await Axios.get(
            `${baseURL}${search}${maxResult}${type}${key}${topicId}&q=${searchTerm}`
        )
        console.log(response.data)
        setYoutubeData(response.data)
    }
    
//Lyrics API call
    const artist = ['beyonce','sza','ariana grande','jay-z','rihanna','cold play','snoop dogg','bruno mars','marc anthony','bad bunny','incubus',
    'a boggie wit da hoodie','tiesto','billy joel','john mayer','el alfa','omega','celia cruz','cardi b','miguel','leon bridges']
    let random = Math.round(Math.random()*artist.length)
    let randomArtist = artist[random]
    console.log(artist[random])
    const [lyricsData, setLyricsData] = React.useState(null)
    const baseLyricsURL = "https://api.happi.dev/v1/music?";
    // const lyricsQ = "q=" + randomArtist
    const hasLyrics = "&lyrics=1";
    const limit = "&limit=";
    const lyricsType = "&type=";
    const apiLyricsKey = "&apikey=6d400baq5E0tR7e8ItaBRyijAyJVpD9qLDYxcli0AwBHLoMayAPtZaNr";   
    
    const getLyricsArray = async (searchTerm) => {
        try{
        const response = await Axios.get(
        `${baseLyricsURL}${limit}${apiLyricsKey}${lyricsType}${hasLyrics}&q=${searchTerm}`
        )
        console.log(searchTerm)
        console.log(response.data)
        console.log(response.data.result[0].api_lyrics)
        getLyricsData(response.data.result[0].api_lyrics)
        } catch (error) {
            console.log('no lyrics found')
            getYoutubeData(searchTerm)
        }
    }
    const getLyricsData = async (data) => {
        const response = await Axios.get(
            data + '?' + apiLyricsKey
        )
        console.log(response.data)
        console.log(response.data.result.lyrics)
        console.log(response.data.result.track + ' ' + response.data.result.artist )
        setLyricsData(response.data.result.lyrics)
        getYoutubeData(response.data.result.track + ' ' + response.data.result.artist)
    }
    
    React.useEffect(()=> {
        getLyricsArray(randomArtist)
    },[])
    return(
        <div className = 'videoMap'>
            <div className = 'videoItem'>
            <div>{youtubeData ? <><h4 className ="videoTitle">{youtubeData.items[0].snippet.title}</h4>  <YouTube videoId= {youtubeData.items[0].id.videoId}/> </> : 
            <h2>No Video Data Was Gathered</h2>}
            </div>
            <p>{lyricsData ? <>{lyricsData}</> : 'No Lyrics Data Was Found'}</p>
            </div>
        </div>
    )
}

export default VideoOutput

//need to grab the randomNumber index from the array or use the 'value' inside of the return statement
//to use in my URL for the lyrics, right now it's just grabbing the artist and not the title, 
//can my api call go after the return? or can I put my call inside of a return statement?
//or move the youtubedata.map outside of the return?
//started getting 403 error on googleapi