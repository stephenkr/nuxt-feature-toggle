<template>
  <section class="container">
    <div>
      <h1 class="title">
        Feature toggle demo
      </h1>

      <div class="page-structure">
        <sidebar>
          <feature-toggle name="my-unique-key" :value="true">
            <div class="sidebar-component-new">
              <p>this should only show if the toggle is true</p>
            </div>
          </feature-toggle>

          <feature-toggle name="my-unique-key" :value="false">
            <div class="sidebar-component-old">
              <p>this should only show if the toggle is false</p>
            </div>
          </feature-toggle>

          <div class="demo-panel">
            <h2>Toggle feature toggles</h2>
            <p>This is a small control box to demonstrate how to change the feature toggles using a query string</p>

            <table>
              <tr>
                <td>
                  "my-unique-key"
                </td>
                <td>
                  <select v-model="toggleMyUniqueKey">
                    <option value="true">
                      True
                    </option>
                    <option value="false">
                      False
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  "body-section"
                </td>
                <td>
                  <select v-model="toggleBodySection">
                    <option value="option-1">
                      Option 1
                    </option>
                    <option value="option-2">
                      Option 2
                    </option>
                    <option value="option-3">
                      Option 3
                    </option>
                  </select>
                </td>
              </tr>
            </table>
          </div>
        </sidebar>
        <section>
          <feature-toggle name="body-section" value="option-1">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse necessitatibus reprehenderit, voluptatum cumque adipisci dolorem, sed quae deleniti ea veritatis, ipsam laboriosam atque quasi? Deleniti numquam explicabo tempore tempora dolore.</p>
          </feature-toggle>
          <feature-toggle name="body-section" value="option-2">
            <h1>With title</h1>
            <p>hello world</p>
          </feature-toggle>
          <feature-toggle name="body-section" value="option-3">
            <h2>With smaller title</h2>
          </feature-toggle>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    queryStrings() {
      return this.$route.query
    },
    toggleMyUniqueKey: {
      get() {
        return this.$route.query['toggle_my-unique-key'] || true
      },
      set(newValue) {
        this.$router.push({
          path: '/',
          query: {
            ...this.queryStrings,
            ...{ 'toggle_my-unique-key': newValue }
          }
        })
      }
    },
    toggleBodySection: {
      get() {
        return this.$route.query['toggle_body-section'] || 'option-1'
      },
      set(newValue) {
        this.$router.push({
          path: '/',
          query: {
            ...this.queryStrings,
            ...{ 'toggle_body-section': newValue }
          }
        })
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  max-width: 1200px;
}
.title {
  text-align: center;
  padding: 50px 0;
}

.page-structure {
  display: grid;
  grid-gap: 25px;
  grid-template-columns: 300px 1fr;
}

.sidebar-component-new {
  height: 200px;
  border: 1px solid #ccc;
  padding: 25px;
}

.sidebar-component-old {
  height: 100px;
  background-color: rgb(97, 196, 58);
  color: #fff;
  padding: 25px;
}

.demo-panel {
  margin-top: 50px;
}

.demo-panel p,
.demo-panel table {
  margin-top: 15px;
}
.demo-panel table {
  width: 100%;
}
.demo-panel table td {
  padding: 5px 0;
}
.demo-panel table td:last-child {
  text-align: right;
}
</style>
