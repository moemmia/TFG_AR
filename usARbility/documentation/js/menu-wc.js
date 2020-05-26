'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">usARbility documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppConfigPageModule.html" data-type="entity-link">AppConfigPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppConfigPageModule-c5a843bf82053c987559a40dc7baa249"' : 'data-target="#xs-components-links-module-AppConfigPageModule-c5a843bf82053c987559a40dc7baa249"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppConfigPageModule-c5a843bf82053c987559a40dc7baa249"' :
                                            'id="xs-components-links-module-AppConfigPageModule-c5a843bf82053c987559a40dc7baa249"' }>
                                            <li class="link">
                                                <a href="components/AppConfigPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppConfigPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatisticsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatisticsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1f7dba76625b73dc68d3910005549508"' : 'data-target="#xs-components-links-module-AppModule-1f7dba76625b73dc68d3910005549508"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1f7dba76625b73dc68d3910005549508"' :
                                            'id="xs-components-links-module-AppModule-1f7dba76625b73dc68d3910005549508"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-1f7dba76625b73dc68d3910005549508"' : 'data-target="#xs-injectables-links-module-AppModule-1f7dba76625b73dc68d3910005549508"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1f7dba76625b73dc68d3910005549508"' :
                                        'id="xs-injectables-links-module-AppModule-1f7dba76625b73dc68d3910005549508"' }>
                                        <li class="link">
                                            <a href="injectables/AppFacade.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ArrayKit.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ArrayKit</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DarkThemer.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DarkThemer</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoaderController.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoaderController</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppsPageModule.html" data-type="entity-link">AppsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppsPageModule-a2939bd0062bb9a4bba1e3920c0beea7"' : 'data-target="#xs-components-links-module-AppsPageModule-a2939bd0062bb9a4bba1e3920c0beea7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppsPageModule-a2939bd0062bb9a4bba1e3920c0beea7"' :
                                            'id="xs-components-links-module-AppsPageModule-a2939bd0062bb9a4bba1e3920c0beea7"' }>
                                            <li class="link">
                                                <a href="components/AppsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EvalAppPageModule.html" data-type="entity-link">EvalAppPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EvalAppPageModule-b2ff3481febbe7b167bb1fa33b8b852e"' : 'data-target="#xs-components-links-module-EvalAppPageModule-b2ff3481febbe7b167bb1fa33b8b852e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EvalAppPageModule-b2ff3481febbe7b167bb1fa33b8b852e"' :
                                            'id="xs-components-links-module-EvalAppPageModule-b2ff3481febbe7b167bb1fa33b8b852e"' }>
                                            <li class="link">
                                                <a href="components/EvalAppPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvalAppPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EvalConfigPageModule.html" data-type="entity-link">EvalConfigPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EvalConfigPageModule-c3d374a3c043efaba5c6415aa5dc86a4"' : 'data-target="#xs-components-links-module-EvalConfigPageModule-c3d374a3c043efaba5c6415aa5dc86a4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EvalConfigPageModule-c3d374a3c043efaba5c6415aa5dc86a4"' :
                                            'id="xs-components-links-module-EvalConfigPageModule-c3d374a3c043efaba5c6415aa5dc86a4"' }>
                                            <li class="link">
                                                <a href="components/EvalConfigPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvalConfigPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EvalSelectionPageModule.html" data-type="entity-link">EvalSelectionPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EvalSelectionPageModule-0f38b5090ac68561c704c3f3d4eff3b0"' : 'data-target="#xs-components-links-module-EvalSelectionPageModule-0f38b5090ac68561c704c3f3d4eff3b0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EvalSelectionPageModule-0f38b5090ac68561c704c3f3d4eff3b0"' :
                                            'id="xs-components-links-module-EvalSelectionPageModule-0f38b5090ac68561c704c3f3d4eff3b0"' }>
                                            <li class="link">
                                                <a href="components/EvalSelectionPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvalSelectionPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluationPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvaluationPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EvaluatePageModule.html" data-type="entity-link">EvaluatePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EvaluatePageModule-af4d0430abc6ac3a239c2b489963666f"' : 'data-target="#xs-components-links-module-EvaluatePageModule-af4d0430abc6ac3a239c2b489963666f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EvaluatePageModule-af4d0430abc6ac3a239c2b489963666f"' :
                                            'id="xs-components-links-module-EvaluatePageModule-af4d0430abc6ac3a239c2b489963666f"' }>
                                            <li class="link">
                                                <a href="components/EvaluatePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvaluatePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EvaluationPageModule.html" data-type="entity-link">EvaluationPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EvaluationPageModule-1bc3f7499e40e92996e763adb53d992d"' : 'data-target="#xs-components-links-module-EvaluationPageModule-1bc3f7499e40e92996e763adb53d992d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EvaluationPageModule-1bc3f7499e40e92996e763adb53d992d"' :
                                            'id="xs-components-links-module-EvaluationPageModule-1bc3f7499e40e92996e763adb53d992d"' }>
                                            <li class="link">
                                                <a href="components/EvaluationPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvaluationPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-c027c67a305f60674ec4ec4de429320d"' : 'data-target="#xs-components-links-module-HomePageModule-c027c67a305f60674ec4ec4de429320d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-c027c67a305f60674ec4ec4de429320d"' :
                                            'id="xs-components-links-module-HomePageModule-c027c67a305f60674ec4ec4de429320d"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingPage.html" data-type="entity-link">HomeRoutingPage</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogInPageModule.html" data-type="entity-link">LogInPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LogInPageModule-9f76f482531ae2096544b920046c68ba"' : 'data-target="#xs-components-links-module-LogInPageModule-9f76f482531ae2096544b920046c68ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogInPageModule-9f76f482531ae2096544b920046c68ba"' :
                                            'id="xs-components-links-module-LogInPageModule-9f76f482531ae2096544b920046c68ba"' }>
                                            <li class="link">
                                                <a href="components/LogInPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogInPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MainPageModule.html" data-type="entity-link">MainPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MainPageModule-0a135ea0fa7b43c1c0959e3108b238fc"' : 'data-target="#xs-components-links-module-MainPageModule-0a135ea0fa7b43c1c0959e3108b238fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MainPageModule-0a135ea0fa7b43c1c0959e3108b238fc"' :
                                            'id="xs-components-links-module-MainPageModule-0a135ea0fa7b43c1c0959e3108b238fc"' }>
                                            <li class="link">
                                                <a href="components/MainPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyEvaluationsPageModule.html" data-type="entity-link">MyEvaluationsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyEvaluationsPageModule-2ad42f63eaed268c513b75205b722101"' : 'data-target="#xs-components-links-module-MyEvaluationsPageModule-2ad42f63eaed268c513b75205b722101"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyEvaluationsPageModule-2ad42f63eaed268c513b75205b722101"' :
                                            'id="xs-components-links-module-MyEvaluationsPageModule-2ad42f63eaed268c513b75205b722101"' }>
                                            <li class="link">
                                                <a href="components/MyEvaluationsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyEvaluationsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OptionsPageModule.html" data-type="entity-link">OptionsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OptionsPageModule-cf0fd458693121579b39ba0cabd44314"' : 'data-target="#xs-components-links-module-OptionsPageModule-cf0fd458693121579b39ba0cabd44314"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OptionsPageModule-cf0fd458693121579b39ba0cabd44314"' :
                                            'id="xs-components-links-module-OptionsPageModule-cf0fd458693121579b39ba0cabd44314"' }>
                                            <li class="link">
                                                <a href="components/OptionsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OptionsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link">ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfilePageModule-a69844e8bf22a31b8e484a1715ae6793"' : 'data-target="#xs-components-links-module-ProfilePageModule-a69844e8bf22a31b8e484a1715ae6793"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-a69844e8bf22a31b8e484a1715ae6793"' :
                                            'id="xs-components-links-module-ProfilePageModule-a69844e8bf22a31b8e484a1715ae6793"' }>
                                            <li class="link">
                                                <a href="components/ProfilePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link">RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegisterPageModule-5e3841cc5c81d0802b6444cc41488e95"' : 'data-target="#xs-components-links-module-RegisterPageModule-5e3841cc5c81d0802b6444cc41488e95"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-5e3841cc5c81d0802b6444cc41488e95"' :
                                            'id="xs-components-links-module-RegisterPageModule-5e3841cc5c81d0802b6444cc41488e95"' }>
                                            <li class="link">
                                                <a href="components/RegisterPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticsPageModule.html" data-type="entity-link">StatisticsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StatisticsPageModule-8b0a90363aad4f60a5cbea37fa4d43aa"' : 'data-target="#xs-components-links-module-StatisticsPageModule-8b0a90363aad4f60a5cbea37fa4d43aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatisticsPageModule-8b0a90363aad4f60a5cbea37fa4d43aa"' :
                                            'id="xs-components-links-module-StatisticsPageModule-8b0a90363aad4f60a5cbea37fa4d43aa"' }>
                                            <li class="link">
                                                <a href="components/StatisticsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatisticsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticsPageModule.html" data-type="entity-link">StatisticsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StatisticsPageModule-8b0a90363aad4f60a5cbea37fa4d43aa-1"' : 'data-target="#xs-components-links-module-StatisticsPageModule-8b0a90363aad4f60a5cbea37fa4d43aa-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatisticsPageModule-8b0a90363aad4f60a5cbea37fa4d43aa-1"' :
                                            'id="xs-components-links-module-StatisticsPageModule-8b0a90363aad4f60a5cbea37fa4d43aa-1"' }>
                                            <li class="link">
                                                <a href="components/StatisticsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatisticsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/StatisticsPage-1.html" data-type="entity-link">StatisticsPage</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AEvaluationPage.html" data-type="entity-link">AEvaluationPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/App.html" data-type="entity-link">App</a>
                            </li>
                            <li class="link">
                                <a href="classes/AStatisticsPage.html" data-type="entity-link">AStatisticsPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AStatisticsPage-1.html" data-type="entity-link">AStatisticsPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link">Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/CriteriaDetail.html" data-type="entity-link">CriteriaDetail</a>
                            </li>
                            <li class="link">
                                <a href="classes/EvaluationPart.html" data-type="entity-link">EvaluationPart</a>
                            </li>
                            <li class="link">
                                <a href="classes/Question.html" data-type="entity-link">Question</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionDetail.html" data-type="entity-link">QuestionDetail</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppFacade.html" data-type="entity-link">AppFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArrayKit.html" data-type="entity-link">ArrayKit</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DarkThemer.html" data-type="entity-link">DarkThemer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderController.html" data-type="entity-link">LoaderController</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Translate.html" data-type="entity-link">Translate</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});