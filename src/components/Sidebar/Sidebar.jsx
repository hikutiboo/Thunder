import React, { Component } from 'react';
import "./sidebar.sass";
import BoltIcon from '@mui/icons-material/Bolt';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Badge, Button, Stack } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends Component {
    badgeCreator = (data) => {
        let iconData = this.iconSetter(data);

        return (
            <Badge
                color="success"
                badgeContent={iconData[1]}
                className={data.className + "-conatiner"}
            >
                {iconData[0]}
            </Badge>
        )
    }

    iconSetter = (data) => {
        let messagesData = this.props.messages,
            currentAccountData = this.props.currentAccount.value,
            unreadCount = 0;

        messagesData[currentAccountData]?.forEach(item => {
            if (item.unread) {
                unreadCount += 1;
            }
        });

        return [
            unreadCount === 0 ? <MessageOutlinedIcon {...data} /> : <ChatBubbleIcon {...data} />,
            unreadCount > 99 ? "99+" : unreadCount
        ];
    }

    render() {

        let links = [
            { name: "home", icon: <HomeIcon sx={{ fontSize: "40px" }} className='home-logo-item' /> },
            { name: "search", icon: <SearchIcon sx={{ fontSize: "40px" }} className='search-logo-item' /> },
            { name: "messages", icon: this.badgeCreator({ sx: { fontSize: "40px" }, className: 'messages-logo-item' }) }
        ];

        return (
            <div className="sidebar-container">
                <div className="sidebar">
                    <Link to="home">
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className="thunder-logo sidebar-item"
                        >
                            <BoltIcon sx={{ transform: "rotate(15deg)", fontSize: "40px" }} className='thunder-logo-item' />
                            <span className="thunder-logo-text menu-item-text">Thunder</span>
                        </Stack>
                    </Link>

                    {
                        links.map((item, i) => {
                            return (
                                <NavLink key={"sidebar-link" + i} to={item.name}>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Button sx={{ color: "unset" }} className="sidebar-item">
                                            {item.icon}
                                            <span className="menu-item-text">{item.name.toUpperCase()}</span>
                                        </Button>
                                    </Stack>
                                </NavLink>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        messages: state.messages,
        currentAccount: state.currentAccount
    };
};

export default connect(mapStateToProps, {})(Sidebar);