import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequsted, loadingError} from '../../actions';
import Spinner from "../spinner";
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() { //получаем данные с сервера
        this.props.menuRequsted();

        const {RestoService} = this.props;
        RestoService.getMenuItems()
        .then(res => this.props.menuLoaded(res))
        .catch(err => {
            this.props.loadingError();
        });
    }

    render() {

        const {menuItems, loading, error} = this.props;

        if(error === true){
            console.log("Error");
            return <Error/>
        }

        if (loading === true){
            console.log("loaDING");
            return <Spinner/>
        } 

        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                    return <MenuListItem menuItem={menuItem} key={menuItem.id}
                    />
                    })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequsted,
    loadingError
};
//     return{
//         menuLoaded: (newMenu) => {
//             dispatch(menuLoaded(newMenu));
//         }
//     }
// }

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));