import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import * as wn from "webnative";
import { FilePath } from "webnative/path";
import AuthRoute from "./components/AuthRoute";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import { Feed } from "./utils/feed";
import { useWebnative } from "./context/webnative";

function App() {
  const { fs, username } = useWebnative();
  const [feed, setFeed] = useState<Feed | null>();

  useEffect(() => {
    async function loadFeed() {
      if (!username || !fs || !fs.appPath) return;

      const feedPath = fs.appPath(wn.path.file("feed.json"));
      if (await fs.exists(feedPath)) {
        console.log("✅ feed file exists");
        const content = await fs.read(feedPath as FilePath);
        console.log('got feed content', content)
        setFeed(Feed.fromString(content as string));
      } else {
        console.log("❌ need to create feed");
        const newFeed = new Feed(`${username}'s blog`);
        await fs.write(feedPath as FilePath, newFeed.toString());
        await fs.publish();
      }
    }

    loadFeed();
  }, [fs, username]);

  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/posts" exact />
        <AuthRoute path="/posts" component={Posts} exact feed={feed} />
        <AuthRoute path="/posts/new" component={Editor} exact feed={feed} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
