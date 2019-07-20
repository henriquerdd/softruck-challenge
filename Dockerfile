#This will be used as a volume only container in kubernetes
#It's only obligation is to copy the apps source code to the persistent disk
FROM alpine:latest

#Add source code to appropriate folder
RUN mkdir /app
ADD src /app