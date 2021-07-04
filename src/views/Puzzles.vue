<template>
	<div>
		<Header title="Puzzles" />
    <PuzzlesBoard />
  </div>
</template>

<script>
import PuzzlesBoard from '../components/chessboards/PuzzlesBoard.vue'
import Header from '../components/Header.vue'

export default {
  name: 'Puzzles',
  components: {
    PuzzlesBoard,
    Header
  },
}
</script>

<style>

</style>