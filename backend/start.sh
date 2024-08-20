#!/bin/bash
echo "███╗░░░███╗░█████╗░░██████╗████████╗███████╗██████╗░"
echo "████╗░████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗"
echo "██╔████╔██║███████║╚█████╗░░░░██║░░░█████╗░░██████╔╝"
echo "██║╚██╔╝██║██╔══██║░╚═══██╗░░░██║░░░██╔══╝░░██╔══██╗"
echo "██║░╚═╝░██║██║░░██║██████╔╝░░░██║░░░███████╗██║░░██║"
echo "╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝"
REMOVE_IMAGES=false
PORT=3000
# Iterate through arguments
for arg in "$@"
do
    case $arg in
        --remove-images)
            REMOVE_IMAGES=true
            shift
            ;;
        --port=*)
            PORT="${arg#*=}"
            shift
            ;;
        *)
            echo "Unknown option: $arg"
            ;;
    esac
done

if $REMOVE_IMAGES; then
    if [ "$(docker images -q)" != "" ]; then
        echo "Removing All docker images"
        docker stop $(docker ps -a -q)
        docker rmi $(docker images -a -q) -f
    else
        echo "No docker images found"
    fi
fi
DOCKER_TAG_NAME="master"
echo "Building docker image"
docker build -t $DOCKER_TAG_NAME . 
echo "Deploying App"
docker run -p $PORT:$PORT -d --env PORT=$PORT --expose $PORT $DOCKER_TAG_NAME