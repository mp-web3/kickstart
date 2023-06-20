import Reaxt from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

const Header = (props) => {
    return (
        <Menu style={{ marginTop: '10px' }}>

            <Link route="/">
                {/* The "Link" component wraps its children with a click event handler */}
                <a className="item">CrowdCoin</a>
            </Link>

            <Menu.Menu position='right'>
                <Link route="/">
                    <a className="item">Campaigns</a>
                </Link>

                <Link route="/campaigns/new">
                    <a className="item">+</a>
                </Link>

            </Menu.Menu>

        </Menu>
    );
}

export default Header;