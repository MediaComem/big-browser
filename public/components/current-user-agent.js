Vue.component('current-user-agent', {
  data() {
    return {
      ua: null
    };
  },
  beforeMount() {
    detectUserAgent().then(result => (this.ua = result));
  },
  template: `
    <div class='col-lg-6 offset-lg-3'>

      <!-- Loading -->
      <h1 class='text-muted' v-if='!ua'>Loading...</h1>

      <!-- Title -->
      <h1 v-if='ua && ua.ua'>Big Browser is watching you</h1>
      <h1 v-if='ua && !ua.ua'>Big Browser cannot watch you</h1>
      <p class='lead mt-3' v-if='ua && ua.ua'>{{ ua.ua }}</p>

      <table class='table mt-5' v-if='ua && (ua.browser || ua.cpu || ua.device || ua.engine || ua.os)'>
        <tbody>

          <!-- Device -->
          <tr v-if='ua.device && (ua.device.vendor || ua.device.type)'>
            <th scope='row' style='width: 50%;'>Device</th>
            <td>
              <span v-if='ua.device.vendor'>{{ ua.device.vendor }}</span>
              <span v-if='ua.device.type'>{{ ua.device.type }}</span>
            </td>
          </tr>

          <!-- Browser -->
          <tr v-if='ua.browser && (ua.browser.name || ua.browser.version)'>
            <th scope='row' style='width: 50%;'>Browser</th>
            <td>
              <span v-if='ua.browser.name'>{{ ua.browser.name }}</span>
              <span v-if='!ua.browser.name' class='text-muted'>N/A</span>
            </td>
          </tr>
          <tr v-if='ua.browser.version'>
            <th scope='row' style='width: 50%;'><small class='text-secondary'>version</small></th>
            <td><small><code>{{ ua.browser.version }}</code></small></td>
          </tr>

          <!-- OS -->
          <tr v-if='ua.os && (ua.os.name || ua.os.version)'>
            <th scope='row' style='width: 50%;'>Operating System</th>
            <td>
              <span v-if='ua.os.name'>{{ ua.os.name }}</span>
              <span v-if='!ua.os.name' class='text-muted'>N/A</span>
            </td>
          </tr>
          <tr v-if='ua.os.version'>
            <th scope='row' style='width: 50%;'><small class='text-secondary'>version</small></th>
            <td><small><code>{{ ua.os.version }}</code></small></td>
          </tr>

          <!-- Engine -->
          <tr v-if='ua.engine && (ua.engine.name || ua.engine.version)'>
            <th scope='row' style='width: 50%;'>Engine</th>
            <td>
              <span v-if='ua.engine.name'>{{ ua.engine.name }}</span>
              <span v-if='!ua.engine.name' class='text-muted'>N/A</span>
            </td>
          </tr>
          <tr v-if='ua.engine.version'>
            <th scope='row' style='width: 50%;'><small class='text-secondary'>version</small></th>
            <td><small><code>{{ ua.engine.version }}</code></small></td>
          </tr>

          <!-- CPU -->
          <tr v-if='ua.cpu.architecture'>
            <th scope='row' style='width: 50%;'>CPU Architecture</th>
            <td>{{ ua.cpu.architecture }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

function detectUserAgent() {
  return request({
    method: 'POST',
    url: '/ua'
  });
}
