# avalon-online

An online recreation of the popular board game Avalon. It is built using Express.js and Socket.io for the backend, and ReactJS for the client. Webpack is used to compile the client code, consisting of the React and Sass code.

### Development

```
git clone https://github.com/allenhuang97/avalon-online
cd avalon-online
npm install
```

Running `npm run dev` will start both Webpack for the client and the node server. To only run the server or client, use these commands respectively:
```
npm run server
npm run client
```

Note: Hot-reloading of the server is supported, but any client changes will require a page refresh to view changes.
