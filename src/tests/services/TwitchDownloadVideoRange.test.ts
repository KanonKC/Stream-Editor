// import { downloadTwitchVideo } from "../../services/downloads/platforms/download-twitch-video"

// downloadTwitchVideo(
//     "https://www.twitch.tv/videos/2165090720",
//     "0:43:31",
//     "1:00:40",
// ).then((response) => {
//     console.log(response)
// })

// twitchDownload("https://www.twitch.tv/kanonkc/clip/RefinedBlatantWoodcockPartyTime-5Z3UtcRwvm-dO4s3").then((video) => {
//     videoTrim(video,6,8).then((result) => {
//         console.log("-------------------------")
//         console.log(result)
//         console.log("-------------------------")
//     })
// })

// twitchDownload("https://www.twitch.tv/videos/1214826771").then((video) => {
//     videoTrim(video,6,8).then((result) => {
//         console.log("-------------------------")
//         console.log(result)
//         console.log("-------------------------")
//     })
// })

// describe("TwitchDownloadVideo", () => {
//     it("should download a video from Twitch", async () => {
//         const video = await twitchDownload("https://www.twitch.tv/videos/1214826771")
//         expect(video).haveOwnProperty("id")
//     })
//     it("should trim a video from Twitch", async () => {
//         const video = await twitchDownload("https://www.twitch.tv/videos/1214826771")
//         const trimmedVideo = await videoTrim(video,6,8)
//         expect(trimmedVideo).haveOwnProperty("id")
//         expect(trimmedVideo).haveOwnProperty("filename")
//         expect(trimmedVideo).haveOwnProperty("platform")
//         expect(trimmedVideo).haveOwnProperty("title")
//     })
// })