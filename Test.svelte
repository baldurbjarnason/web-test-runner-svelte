<script>
  import { setContext } from "svelte";
  export let foo = "test"
  function test () {
    if (foo === "dingus") {
      console.log("this is a test function")
    } else {
      console.log("coverage doesn't seem to be working now")
    }
  }
  $: if (foo) {
    test()
  }
</script>

<style>
  p {margin-top: 32px}
</style>

<p class="Test">{foo}</p>
