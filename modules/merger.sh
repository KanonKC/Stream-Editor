ffmpeg -y -i $1 -r 30 -i $2  -filter:a aresample=async=1 -c:a flac -c:v copy $3