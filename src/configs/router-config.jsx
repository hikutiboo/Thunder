import { Link, createBrowserRouter, Navigate, Outlet, useParams } from "react-router-dom";
import { AccountViewPost, HomePage, Login, Messages, NewPost, Profile, Register, Search, SwitchAccount, View } from "../components/components";
import store from "../store/store";

const currentUser = store.getState().currentAccount.value;

function LoginWithParams() {
    return <Login userId={useParams().userId} />
}

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <View />,
            children: [
                {
                    path: "",
                    element: <Navigate to="home" replace={true} />
                },
                {
                    path: "home",
                    element: (
                        <HomePage />
                    )
                },
                {
                    path: "register",
                    element: (
                        <Register />
                    )
                },
                {
                    path: "switch-account",
                    element: (
                        <SwitchAccount />
                    )
                },
                {
                    path: "search",
                    element: (
                        <Search />
                    )
                },
                {
                    path: "messages",
                    element: (
                        <Messages />
                    )
                },
                {
                    path: "login",
                    element: (
                        <Outlet />
                    ),
                    children: [
                        {
                            path: "",
                            element: (
                                <Login />
                            )
                        },
                        {
                            path: ":userId",
                            element: <LoginWithParams />
                        }
                    ]
                },
                {
                    path: "user",
                    element: <Outlet />,
                    children: [
                        {
                            path: "",
                            element: <Navigate to={currentUser} replace={true} />
                        },
                        {
                            path: ":userId",
                            element: (
                                <>
                                    <Profile />
                                    <Outlet />
                                </>
                            ),
                            children: [
                                {
                                    path: "post/:postId",
                                    element: <AccountViewPost />
                                },
                                {
                                    path: "new-post",
                                    element: <NewPost />
                                }
                            ]
                        },
                        {
                            path: "*",
                            element: (
                                <div>
                                    <h1>Error 404</h1>
                                    <h2>page not found</h2>
                                    <Link to="home">Go back home</Link>
                                </div>
                            ),
                        }
                    ],
                },
                {
                    path: "*",
                    element: (
                        <div>
                            <h1>Error 404</h1>
                            <h2>page not found</h2>
                            <Link to="home">Go back home</Link>
                        </div>
                    ),
                }
            ]
        }
    ]);

export default router;