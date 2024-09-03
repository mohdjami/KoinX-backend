Requirements
**Develop a Server Side Application to fetch Crypto Transactions of a user**

**Mandatory Tasks:-**

API Documentation: https://documenter.getpostman.com/view/26354863/2sAXjNXqn7

Deployed Link: https://koin-x-backend.vercel.app/

GitHub Link: https://github.com/mohdjami/KoinX-backend

Task 1:
In task 1 we have to fetch the transactions by giving and address and retrieving all the transactions of of that Address and save it in database.

Previously the request was taking more than 2 seconds to process.

![Screenshot 2024-09-03 202136.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32c8d686-cb3a-45e8-9bfc-53380f009e76/202b8756-e41a-4ba6-9c15-924441afd2cf/Screenshot_2024-09-03_202136.png)Requirements
**Develop a Server Side Application to fetch Crypto Transactions of a user**

**Mandatory Tasks:-**

API Documentation: https://documenter.getpostman.com/view/26354863/2sAXjNXqn7

Deployed Link: https://koin-x-backend.vercel.app/

GitHub Link: https://github.com/mohdjami/KoinX-backend

Task 1:
In task 1 we have to fetch the transactions by giving and address and retrieving all the transactions of of that Address and save it in database.

Previously the request was taking more than 2 seconds to process.

![Screenshot 2024-09-03 202136.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32c8d686-cb3a-45e8-9bfc-53380f009e76/202b8756-e41a-4ba6-9c15-924441afd2cf/Screenshot_2024-09-03_202136.png)

As you can see here. I optimized the code for faster response instead of using regular technique of fetching the transactions and adding it.

Here is what I did:

```jsx
const bulkOps = transactions.map((item) => {
  item.user = user._id;
  return {
    updateOne: {
      filter: { hash: item.hash },
      update: { $setOnInsert: item },
      upsert: true,
    },
  };
});

await Transaction.bulkWrite(bulkOps);
```

I used bulk oprations and upsert. This approch increased the efficiency by 78% from 2s to 438ms.

![Screenshot 2024-09-03 203033.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32c8d686-cb3a-45e8-9bfc-53380f009e76/b0dfa3e8-05ca-4a26-98c0-4ec41c6a760e/Screenshot_2024-09-03_203033.png)

Task2: Fetch and update the price of the Ethereum after every 10 minutes:

For this task I used cron jobs and scheduled the task for the price to fetch and update in the interval of 10 mins for eg 10:10, 10:20 etc.

For scalability: If there are multiple instances I have used Lock mechanism through redis. The instance which will acquire the lock only it will perform the task.

Task3: Get request to fetch the Calculated total expenses and price.
I already cached the Price in cron jobs so it will come from redis for faster respose.

For calculating totalExpenses I used Aggregation Pipeline.

Deployment:

Dockerized the application and used docker-compose.
After setting up the env variables
You can run the application with just one command docker compose up.

Or build the image with docker run command.

I am currently using vercel to deploy it as I am travelling so I had less time:
Scalable Options that I can use:
Use AWS ECS for deploying the docker container servlessly.

Use AWS EC2 instance.

Use Kubernetes for managing multiple services like Nodejs app, Mongodb and Redis, Helm as package manager and deploy it on AWS.

Testing

Run npm run test for testing the application and all tasks at once.

As you can see here. I optimized the code for faster response instead of using regular technique of fetching the transactions and adding it.

Here is what I did:

```jsx
const bulkOps = transactions.map((item) => {
  item.user = user._id;
  return {
    updateOne: {
      filter: { hash: item.hash },
      update: { $setOnInsert: item },
      upsert: true,
    },
  };
});

await Transaction.bulkWrite(bulkOps);
```

I used bulk oprations and upsert. This approch increased the efficiency by 78% from 2s to 438ms.

![Screenshot 2024-09-03 203033.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32c8d686-cb3a-45e8-9bfc-53380f009e76/b0dfa3e8-05ca-4a26-98c0-4ec41c6a760e/Screenshot_2024-09-03_203033.png)

Task2: Fetch and update the price of the Ethereum after every 10 minutes:

For this task I used cron jobs and scheduled the task for the price to fetch and update in the interval of 10 mins for eg 10:10, 10:20 etc.

For scalability: If there are multiple instances I have used Lock mechanism through redis. The instance which will acquire the lock only it will perform the task.

Task3: Get request to fetch the Calculated total expenses and price.
I already cached the Price in cron jobs so it will come from redis for faster respose.

For calculating totalExpenses I used Aggregation Pipeline.

Deployment:

Dockerized the application and used docker-compose.
After setting up the env variables
You can run the application with just one command docker compose up.

Or build the image with docker run command.

I am currently using vercel to deploy it as I am travelling so I had less time:
Scalable Options that I can use:
Use AWS ECS for deploying the docker container servlessly.

Use AWS EC2 instance.

Use Kubernetes for managing multiple services like Nodejs app, Mongodb and Redis, Helm as package manager and deploy it on AWS.

Testing

Run npm run test for testing the application and all tasks at once.
