
const YOUTUBE_PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlists";

export default async function youtube() {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistsAIzaSyBhtBPZz75HQw7rRoGmG8N0seViddjuaUs`);
    const data = await res.json();
    return {
        props: {
            data
        }
    }
}

