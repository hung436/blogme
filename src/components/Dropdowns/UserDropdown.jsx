import React from "react";
import { createPopper } from "@popperjs/core";
import { dispatch } from "../../app/Store/store";
import { Logout } from "../../app/Reducer/authSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const UserDropdown = () => {
  const { isAdmin, userInfo } = useSelector((state) => state.auth);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <div className='relative ' on>
      <div
        className='text-blueGray-500 block '
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className='items-center flex'>
          <span className='w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full'>
            <img
              alt='...'
              className='w-full rounded-full align-middle border-none shadow-lg'
              src={
                userInfo && userInfo.Avatar
                  ? userInfo.Avatar
                  : "https://lh3.googleusercontent.com/a-/ACNPEu9Ktsu5fgKx5Ea3YpzidjRpLBDbW5kyfLD2gQ9udA=s96-c-rg-br100"
              }
            />
          </span>
        </div>
      </div>
      <div
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 right-0 py-2 list-none text-left rounded shadow-lg min-w-48 absolute"
        }
      >
        <Link
          to='/profile'
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Thông tin người dùng
        </Link>
        <Link
          to='/order'
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Đơn hàng
        </Link>
        <Link
          to='user/favorite'
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Yêu thích
        </Link>
        {isAdmin && (
          <Link
            to='/admin'
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            Trang quản trị
          </Link>
        )}
        {userInfo && userInfo.RoleId === "shipper" && (
          <Link
            to='/shipper'
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            Trang Shipper
          </Link>
        )}
        <div className='h-0 my-2 border border-solid border-blueGray-100' />
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => dispatch(Logout())}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
