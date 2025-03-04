import React from 'react'

export default function KeyboardTaipei({ searchBusRoute, searchText, backSearch, setSearchText }) {
  return (
    <div className="container">
      <ul className="row gx-2 list-unstyled mb-3">
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#E87E7E',
            }}
            onClick={(e) => searchBusRoute(e)}>
            紅
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#3591C5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            藍
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            1
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            2
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            3
          </button>
        </li>
      </ul>
      <ul className="row gx-2 list-unstyled mb-3">
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#5CC1A9',
            }}
            onClick={(e) => searchBusRoute(e)}>
            綠
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#A86556',
            }}
            onClick={(e) => searchBusRoute(e)}>
            棕
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            4
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            5
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            6
          </button>
        </li>
      </ul>
      <ul className="row gx-2 list-unstyled mb-3">
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#EEA12E',
            }}
            onClick={(e) => searchBusRoute(e)}>
            橘
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#DEBE4E',
            }}
            onClick={(e) => searchBusRoute(e)}>
            黃
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            7
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            8
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            9
          </button>
        </li>
      </ul>
      <ul className="row gx-2 list-unstyled">
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#888888',
            }}
            onClick={(e) => searchBusRoute(e)}>
            F
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#888888',
            }}
            onClick={(e) => searchBusRoute(e)}>
            小
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
            style={{
              backgroundColor: '#283C43',
            }}
            disabled={!searchText}
            onClick={backSearch}>
            倒退
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={(e) => searchBusRoute(e)}>
            0
          </button>
        </li>
        <li className="col">
          <button type="button"
            className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
            style={{
              backgroundColor: '#D5D5D5',
            }}
            onClick={() => setSearchText('')}>
            清除
          </button>
        </li>
      </ul>
    </div>
  )
}
