import { combineReducers } from "redux";
import searchArticle from "./searchArticle";
import bookmarks from "./bookmarks";

const reducer = combineReducers({
  search: searchArticle,
  bookmarks,
});

export default reducer;
