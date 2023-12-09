<template>
  <div class="footer-contain">
    <div class="line"></div>
    <div class="copyright">
      SCRIPT developers studio <span>©</span>
      <span class="email">
        <a
          href="https://mail.google.com/mail/u/0/?tab=om#inbox?compose=CllgCHrgljwZRpXjNrvTSkgCLnPwzqrSdWkKwMNtFzHjCpsHVlLplGVvbjStzQRpNPbJjxRVljq"
          target="blank"
          >{{ $email }}</a
        >
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$link-d-color: $base-darkTheme-text-color;
$link-color: #000;
$link-text-size-mobile-horizontal: 1em;

.footer-contain {
  position: fixed;
  bottom: 0px;

  color: $link-color;
  width: 100%;
  margin: 8px 0px;
  text-align: center;

  @include darkTheme() {
    color: $link-d-color;
  }
}
.line {
  position: relative;
  top: 3px;

  height: 1px;
  width: calc((97px * 2));
  margin: 0 auto;
}

.copyright {
  margin-top: 10px;
  font-size: 12px;
  color: $link-color;

  @include darkTheme() {
    color: $link-d-color;
  }

  a {
    &,
    &:active,
    &:hover {
      color: $link-color;
      text-decoration: underline;
      text-decoration: none;

      @include darkTheme() {
        color: $link-d-color;
      }
    }
  }

  &:-webkit-any-link {
    color: $link-color;

    @include darkTheme() {
      color: $link-d-color;
    }
  }
}

.email {
  margin-left: 12px;
  margin-right: 3px;
}

@media (max-device-height: 410px) {
  .footer-contain {
    position: relative;
    margin-top: 30px;
  }
}

@media (max-device-width: 580px) {
  .copyright {
    font-size: 14px;
  }
}
</style>
