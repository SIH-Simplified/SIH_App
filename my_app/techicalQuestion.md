# Technical questions

## List reason for using Mongo DB

MongoDB which is known as NoSQL document database which is capable of storing humongous data loads . After doing some research we found out that there are about

Mongo DB is a NoSQL document database which is used to handle humongous amount of data . We during our research found that there are about 66,033 school in India and around 1,32,969 teachers in India . Considering that the number of school and teachers are going to increase in the future , we need a database that can scale easily . SQL are secure by default but require a schema to work but as the complexity grows they become harder to work with , also our requirements of our app kept on changing thus Mongo DB has a flexible schema thus it was suitable database for our application

## Find a scalable solutions

One of the issues that we faced while collecting and sending pdf , docs across different teachers and admins is that storing pdf files in Mongo DB uses GridFS which breaks down pdf , doc files into smaller chunks in the database which is a lot more complex thus we decided to use the cloud solution called cloudinary for storing data in the cloud and store the URL where the data is being stored which helps us reducing the complexity of our backend

## fault tolerant cloud solution , Calamity and power losses covering using cloud backup

We are going to host Mongo DB in Mongo DB Atlas and it uses Atlas uses the native snapshot capabilities of your cloud provider to support full-copy snapshots and localized snapshot storage.

Atlas supports Cloud Backups on:

- Microsoft Azure

- Amazon Web Services (AWS)

- Google GCP

Mongo DB atlas uses several shared clusters and copy the same data across different clusters so if one cluster goes down and then other clusters will be there for backup
