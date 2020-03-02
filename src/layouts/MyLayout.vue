<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar size="xl">
            <img src="statics/icons/LOGO.svg">
          </q-avatar>
          Course Catalog
        </q-toolbar-title>
        <q-btn flat dense round>
          <q-icon name="more_vert" />
          <q-menu>
            <q-list link separator class="scroll" style="min-width: 100px">
              <q-item clickable @click.native="logOut()" style="padding: none; ">
                <q-item-section>
                  Log Out
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import libs from '../libs/libs'

export default {
  name: 'MyLayout',

  data () {
    return {
      
    }
  },
  methods:{
    logOut() {
      libs.logOut()
    }
  }
}
</script>
