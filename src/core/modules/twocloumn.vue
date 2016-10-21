<template>
  <div class="twocloumn" v-html="content"></div>
</template>

<script>
  import mixinComponent from 'core/mixin'
  var DEFAULT_CONTENT = `
	<div class="plekan-clearfix">
		<h2 contenteditable="true" class="twocloumn-title">Schiaparelli kayıp</h2>
      <div contenteditable="true" class="twocloumn-text">ESA, Schiaparelli’nin Mars’a önceki günkü inişi sırasında beklenenden farklı hareket ettiğini açıkladı. Kurumun gezegenlerle ilgili çalışmalarından sorumlu Andrea Accomazzo, robota ne olduğunu bilemediklerini itiraf etti.

        <p>Keşif robotunu fırlatan uydudan gelen veriler, robotun, paraşütünü çok erken açtığını gösteriyor.</p>

        Ayrıca robotun yüzeye iyice yaklaştığında kendisini yere oturtmaya yarayacak roketleri de beklenenden çok daha kısa süre çalıştırdığı tahmin ediliyor.

        BBC Türkçe’deki habere göre ESA henüz robotun inerken parçalanıp parçalanmadığını kesin olarak belirleyemedi ama iyimser de değil. Uzmanlar, verileri incelemeye ve küçük bir ihtimal de olsa gezegen yüzeyine oturduysa diye Schiaparelli’ye sinyaller yollamaya devam ediyor. Şu anda ESA’nın bütün yapabileceği, Schiaparelli’nin inişe 1 dakika kalana kadar, kendisini fırlatan TGO adlı uyduya gönderdiği verileri taramak suretiyle anlayabilmek.
      </div>
	</div>
  `
  export default {
  	mixins:[ mixinComponent ],
    data () {
      return {
        DEFAULT_CONTENT : DEFAULT_CONTENT
      }
    },
    updated(){
      // this.me.contents[this.displayLanguage].fields["src"] = this.$el.querySelector('img').src
    }
  }
</script>
<style>
  .twocloumn-title{
    padding-left: 30px;
  }
  .twocloumn-text{
    margin-bottom: 29px;
    padding-left: 30px;
  }
</style>