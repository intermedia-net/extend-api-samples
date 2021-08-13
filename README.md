<h1 align="center">
  <a href="https://developer.intermedia.com/">
    <img alt="Intermedia" title="Intermedia" src="https://developer.intermedia.com/assets/images/logo-beta.svg" width="450">
  </a>
</h1>

# JavaScript sample code for Extend Platform API

  This sample code shows how to work with <a href="https://developer.intermedia.com/index.html">Extend Platform API</a>.
  
  The Extend Platform API allows you to integrate the features of Intermedia's award-winning voice, video, contact center, and analytics services into business applications (CRMs, ERPs, Ticketing Systems, etc.).

## Authorization

   You are going to need a set of valid credentials to invoke the APIs. Please follow the instructions provided in the [Intermedia Unite Extend API page](https://kb.intermedia.net/article/63780) to register your service account and your application CLient ID.

   > NOTE: You need the Account Owner, or Technical Administrator with Intermedia Unite or Intermedia Anymeeting permissions to access the Extend API section of **Hostpilot Control Panel**. If you do not have the sufficient permissions, please contact your account administrator for help.

   Please review the [Authorization API reference](https://developer.intermedia.com/api/spec/calling/index.html#dev-guide-auth-guide) for detailed information about supported authorization flows and credentials.

## Hosting the code

  To use the provided samples, you would need to host the repository on some website (because you need a unique client URL for proper authorization configuration). There are multiple options how to achieve this, but the simplest ones are:

* **Option 1**: [Fork](https://github.com/intermedia-net/extend-api-samples/fork) the repository into your own account, and [enable the GitHub pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) for it.
* **Option 2**: Self-host the code. Clone our repository and use your favorite http server (nginx, apache, IIS, etc).

## Invoking the APIs

* Browse the **index.html** file to configure and authorize your client.
* After the successful authorization you will see the menu with the available API call samples.

## Credits

  This code sample uses [**OIDC client**](https://github.com/IdentityModel/oidc-client-js) - a library for providing OpenID Connect (OIDC) and OAuth2 protocol support for client-side, browser-based JavaScript client applications.

## License

  This code sample is licensed under [MIT License](https://github.com/intermedia-net/extend-api-samples/blob/main/LICENSE).

## Feedback

  Excited? Frustrated? Please feel free to contact us via the [feedback form](https://developer.intermedia.com/articles/feedback.html).
