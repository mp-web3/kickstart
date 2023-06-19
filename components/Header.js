import Reaxt from 'react';
import { Menu } from 'semantic-ui-react';

const Header = (props) => {
    return (
        <Menu style={{ marginTop: '10px' }}>

            <Menu.Item>
                Crowdcoin
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    Campaigns
                </Menu.Item>

                <Menu.Item>
                    +
                </Menu.Item>

            </Menu.Menu>

        </Menu>
    );
}

export default Header;