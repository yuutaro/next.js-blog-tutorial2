import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./modules/themeSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


// まず、combineReducers関数を使用して、複数のreducerを一つにまとめています。この例では、themeReducerという名前のreducerがあり、それがthemeというキーに関連付けられています。これにより、state.themeを通じてテーマに関する状態にアクセスできます。
const rootReducer = combineReducers({
  theme: themeReducer,
});

// 次に、Redux Persistの設定を定義しています。persistConfigオブジェクトでは、永続化のキーとストレージエンジンを指定しています。キーは"root"となっており、これは永続化されるデータのルートを表します。storageは、データを保存するためのストレージエンジンを指定します。
const persistConfig = {
  key: "root",
  storage,
};

// その後、persistReducer関数を使用して、永続化を可能にするreducerを作成しています。この関数は、指定した設定とreducerを引数に取り、新しいreducerを返します。この新しいreducerは、アプリケーションの状態を永続化するために使用されます。
const persistedReducer = persistReducer(persistConfig, rootReducer);

// そして、configureStore関数を使用して、Reduxストアを作成しています。この関数は、アプリケーションの状態を管理するための中心的な場所を提供します。ここでは、永続化されたreducerを使用してストアを設定しています。
export const store = configureStore({
  reducer: persistedReducer,
});

// _app.tsxの<PersistGate loading={null} persistor={persistor}>で使用
export const persistor = persistStore(store);
