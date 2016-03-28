# url-shortener
pure js link shortener, just for fun - featuring: es2016 goodness

# install
npm install

##db config
Setup for mongodb

Create two collections: counter, links

insert into counter collection initial counter values:
```
{
  obj: 'counter',
  seq: 0
}
```

# run
node index

# notes
I know redis would be a better db, but I chose mongo just to see how a document storage would work here.
I wrote the db layer so it can be easily swappable. 
