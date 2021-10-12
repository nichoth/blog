## learning about wn

The 'publish' button just console logs the input --
https://github.com/fission-suite/blog/blob/develop/src/pages/Editor.tsx#L18

Where would the input go in real life?

My guess is that you use the `webnative` module to `fs.write` the blog post
somewhere.

-----------------------------------------

The `Posts.tsx` file logs `console.log("✅ feed file exists")` when I start the
app. What is the feed file and where is it?

The `fs` here is the webnative module.
```js
  // src/pages/Posts.tsx
  const { fs, username } = useWebnative();
```

Likewise, uploading a photo would be a matter of `fs.write`ing an image blob.

---------------------------------------------------

So, that's a lot of state that is implied when using the `webnative` module.
Where does `fs` read from?

In `Posts.tsx`, we call fs.exists on a feedPath. The feedPath comes from
```js
const feedPath = fs.appPath(wn.path.file("feed.json"));
```

https://github.com/fission-suite/webnative#web-native-file-system

```js
// List the user's private files that belong to this app
await fs.ls(fs.appPath())
```

```js
// Create a sub directory and add some content
await fs.write( fs.appPath(wn.path.file("Sub Directory", "hello.txt")), "👋" )
```

So `fs.appPath` returns a path to this app's files.

------------------------------------------------------

From what I've read so far...
`webnative` seems to keep a merkle-dag of file-like data.

Where does it store the actual files? I assume `webnative` has some kind of
synchronization built in, so you could have a local copy + multiple remotes,
like git.

https://guide.fission.codes/developers/webnative/file-system-wnfs
> The Web Native File System (WNFS) is a file system built on top of the InterPlanetary File System (IPFS)

So it stores files in ipfs.

https://guide.fission.codes/developers/webnative/file-system-wnfs#publish
> The publish function synchronizes your file system with the Fission API and IPFS. WNFS does not publish changes automatically because it is more practical to batch changes in some cases.

* where do you define the ipfs 'remote'? 

-----------------------------------------------------------

### How does authentication work? How does it know who I am?

https://guide.fission.codes/developers/webnative/auth#authentication

> Users authenticate once per browser in the Fission Auth Lobby. If the user is new to Fission, they are prompted to sign up. They may also link an existing account from another browser.

> Webnative stores user credentials in the browser, and authentication through a third-party is not necessary. Private credentials are stored as WebCrypto CryptoKeys

