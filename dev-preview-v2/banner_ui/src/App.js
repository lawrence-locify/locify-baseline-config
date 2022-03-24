import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { appStore, onAppMount } from "./state/app";

import { Wallet } from "./components/Wallet";
import { Contract } from "./components/Contract";

import { MarketPlace } from "./components/MarketPlace";
import { Publisher } from "./components/Publisher";
import { Home } from "./components/Home";

import Avatar from "url:./img/user.png";
import NearLogo from "url:./img/near_icon.svg";
import LocifyLogo from "url:./img/locify.png";

import "./App.scss";

const App = () => {
  const { state, dispatch, update } = useContext(appStore);

  const {
    app,
    views,
    app: { tab, snack },
    near,
    wallet,
    contractAccount,
    account,
    loading,
  } = state;

  const [profile, setProfile] = useState(false);

  const onMount = () => {
    dispatch(onAppMount());
  };
  useEffect(onMount, []);

  const signedIn = wallet && wallet.signedIn;

  if (profile && !signedIn) {
    setProfile(false);
  }
  const Header = () => {
    return (
      <div id="menu">
        <div>
          <img
            style={{ width: 150 }}
            src={LocifyLogo}
            onClick={() => (window.location.href = window.location.origin)}
          />
        </div>
        <div class="avtarContainer">
          {signedIn && (
            <img
              style={{ opacity: signedIn ? 1 : 0.25 }}
              src={Avatar}
              onClick={() => setProfile(!profile)}
            />
          )}
          {!signedIn ? <Wallet {...{ wallet }} /> : account.accountId}
        </div>
        {profile && signedIn && (
          <>
            <div id="profile">
              <div>
                {wallet && wallet.signedIn && (
                  <Wallet
                    {...{
                      wallet,
                      account,
                      update,
                      dispatch,
                      handleClose: () => setProfile(false),
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Switch>
      <Route
        path="/market-place"
        render={() => {
          return (
            <div>
              <Header />
              <div id="gallery">
                <MarketPlace
                  {...{
                    app,
                    views,
                    update,
                    loading,
                    contractAccount,
                    account,
                    dispatch,
                  }}
                />
              </div>
            </div>
          );
        }}
        exact
      />
      <Route
        path="/publisher"
        render={() => {
          return (
            <div>
              <Header />
              <div id="gallery">
                <Publisher
                  {...{
                    app,
                    views,
                    update,
                    loading,
                    contractAccount,
                    account,
                    dispatch,
                  }}
                />
              </div>
            </div>
          );
        }}
        exact
      />
      <Route
        path="/mint"
        render={() => {
          return (
            <div>
              <Header />
              <div id="contract">
                {signedIn && (
                  <Contract {...{ near, update, wallet, account }} />
                )}
              </div>
            </div>
          );
        }}
        exact
      />
      <Route
        path="/"
        render={() => {
          return (
            <div>
              {/* <div id="menu">
                <div>
                  <img
                    style={{ opacity: signedIn ? 1 : 0.25 }}
                    src={Avatar}
                    onClick={() => setProfile(!profile)}
                  />
                </div>
                <div>
                  {!signedIn ? <Wallet {...{ wallet }} /> : account.accountId}
                </div>
                {profile && signedIn && (
                  <div id="profile">
                    <div>
                      {wallet && wallet.signedIn && (
                        <Wallet
                          {...{
                            wallet,
                            account,
                            update,
                            dispatch,
                            handleClose: () => setProfile(false),
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div> */}
              <div id="gallery" className="homeButtonContainer">
                <Home />
              </div>
            </div>
          );
        }}
        exact
      />
      {/* <Route
        render={() => {
          return (
            <>
              {loading && (
                <div className="loading">
                  <img src={NearLogo} />
                </div>
              )}
              {snack && <div className="snack">{snack}</div>}

              <div className="background"></div>

              <div id="menu">
                <div>
                  <img
                    style={{ opacity: signedIn ? 1 : 0.25 }}
                    src={Avatar}
                    onClick={() => setProfile(!profile)}
                  />
                </div>
                <div>
                  {!signedIn ? <Wallet {...{ wallet }} /> : account.accountId}
                </div>
                {profile && signedIn && (
                  <div id="profile">
                    <div>
                      {wallet && wallet.signedIn && (
                        <Wallet
                          {...{
                            wallet,
                            account,
                            update,
                            dispatch,
                            handleClose: () => setProfile(false),
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {signedIn && (
                <div id="tabs">
                  <div
                    onClick={() => update("app.tab", 1)}
                    style={{ background: tab === 1 ? "#fed" : "" }}
                  >
                    Market
                  </div>
                  <div
                    onClick={() => update("app.tab", 2)}
                    style={{ background: tab === 2 ? "#fed" : "" }}
                  >
                    My NFTs
                  </div>
                  <div
                    onClick={() => update("app.tab", 3)}
                    style={{ background: tab === 3 ? "#fed" : "" }}
                  >
                    Mint
                  </div>
                </div>
              )}

              {signedIn && tab === 3 && (
                <div id="contract">
                  {signedIn && (
                    <Contract {...{ near, update, wallet, account }} />
                  )}
                </div>
              )}
            </>
          );
        }}
      /> */}
    </Switch>
  );
};

export default App;
