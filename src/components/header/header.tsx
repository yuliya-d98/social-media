import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Menu, MenuProps, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer';
import { selectAvatar, selectIsAuth, selectLogin } from '../../redux/auth-selectors';
import { sideLink } from '../sidebar/sidebar';
import s from './header.module.css';

const headerLinks = [
  {
    title: 'Users',
    link: '/users',
  },
];

export const headerItems: MenuProps['items'] = headerLinks.map((item) => {
  return {
    key: item.title,
    label: sideLink({ link: item.link, label: item.title }),
  };
});

const AppHeader = () => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectLogin);
  const photo = useSelector(selectAvatar);
  const dispatch = useDispatch();
  return (
    <>
      {/* <div className="logo" /> */}
      <Row justify="space-between">
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={headerItems} />
        </Col>

        {isAuth ? (
          <>
            <Col span={2}>
              <Avatar
                alt={login || 'avatar'}
                style={{ backgroundColor: '#87d068' }}
                src={photo}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={2}>
              <p className={s.login}>{login}</p>
            </Col>
            <Col span={2}>
              <Button onClick={dispatch(logout)}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <NavLink to={'/login'} className={s.button}>
              Login
            </NavLink>
          </Col>
        )}
      </Row>
    </>
  );
};

export default AppHeader;
