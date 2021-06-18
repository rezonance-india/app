import TrackPlayer from "react-native-track-player";

module.exports = async () => {
    TrackPlayer.addEventListener("remote-play",() => {
        TrackPlayer.play();
    })

    TrackPlayer.addEventListener("remote-pause",() => {
        TrackPlayer.pause();
    })

    TrackPlayer.addEventListener('remote-jump-forward', async () => {
        let newPosition = await TrackPlayer.getPosition();
        let duration = await TrackPlayer.getDuration();
        newPosition += 10;
        if (newPosition > duration) {
            newPosition = duration;
        }
        TrackPlayer.seekTo(newPosition);
    });
 
    TrackPlayer.addEventListener('remote-jump-backward', async () => {
        let newPosition = await TrackPlayer.getPosition();
        newPosition -= 10;
        if (newPosition < 0) {
            newPosition = 0;
        }
        TrackPlayer.seekTo(newPosition);
    });

    TrackPlayer.addEventListener("remote-seek", async ({position}) =>{
        await TrackPlayer.seekTo(position);
    });
}