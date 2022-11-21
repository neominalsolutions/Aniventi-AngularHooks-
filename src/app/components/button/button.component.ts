import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {



  // Angular Hooks 
  // Angular component ile çalışırken ngOnit,ngChanges,ngDestroy,ngAfterViewInit component methodları ile yaygın olarak kullanır ve bu metholar berlirli durumlarda otomatik çalışır.


  // ts dosyasında yakalama kodu
  @ViewChild('myLabel') myLabel!:LabelComponent;


  // dışarıdan componente geçilien değerlere input yöntemi diyoruz.

  @Input() color:string = 'blue';
  @Input() bgColor:string = 'white';
  @Input() size:string = 'md' // md,sm,x-large, lg

  // ed takısı kullanmamızın sebebi bu component ile bir etkileşim sonucu bir eventin olayın tetiklenmesi fırlatılmasıdır. Bu olay artık geçmiş zamanda gerçekleşmştir.
  @Output() sizeChanged:EventEmitter<any> = new EventEmitter<any>();

  // buton ile etkileşime geçince kendi eventlerimizi oluşturabiliriz.

  btnSize:string = "12px"; // md sm 10px lg 16px xx-large 24px x-large 21px

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // Dış component parent componentten iç component child componente değer geçerken ngOnChanges otomatik çalışır. Her bir değer değişiminde de yine tetiklenir. Aslında ngOnint öncesinde çalışmasının sebebide budur.
    //console.log('ngOnChanges', changes);

   this.changeSize();

   this.sizeChanged.emit({fontSize:this.btnSize});

  }

  ngOnInit(): void {

    // Component ilk açıldığında çalışan method
    // apiden veri çekme işlemi yapıyoruz
    // ngOnInit bu hookta child component instanceları undefined döner.
    console.log('ngOnInit', this.myLabel);
    //this.myLabel.setText('my Label');

    this.changeSize();

    // olay fırlatma işleminde emit methodunu kullanıyoruz.
    // add event listener ile event tanımladım fakat bu eventi dinlemek için tetiklemedim.
    this.sizeChanged.emit({fontSize:this.btnSize});


  }

  ngAfterViewInit(): void {
    // ngOnInit ten sonra çalışır. Sayfaya yeni bir child component yüklendiğinde o child componente erişmemizi sağlar.
    // bir component içindeki başka bir componente erişip onla alakalı methodları tetikleyebiliriz.
    // yani varsayılan olarak angularda bir component için tanımlı componentler performans sebebi ile component init olduktan sonra ngAfterViewInit method içerisinde erişilebilir olurlar.
    console.log('ngAfterViewInit', this.myLabel);
    this.myLabel.setText('my Label');
  }

  ngOnDestroy(): void {
    // component domdan ayrıldığında yani *ngIf olabilir bu durumda.
    // sayfadan başka bir sayfaya geçiş durumu olabilir.
    // Böyle durumlarda arka planda çalışan bir Observable Bir service, interval,timeout gibi tarayıcıyı yoran işlemler olabilir bunları temizlemezsek uygulamamız performansız çalışır. Bunun bu kısımda belirli unsubscribe,clearInterval gibi kodları çalıştırırırız.
    console.log('ngOnDestroy')
  }
  




  changeSize(){
    switch (this.size) {
      case 'sm':
        this.btnSize = "10px";
        break;
      case 'lg':
        this.btnSize = "16px";
        break;
      case 'x-large':
         this.btnSize = '21px';
         break;
      case 'xx-large':
        this.btnSize = "24px";
        break;
      default:
        this.btnSize = "12px";
        break;
    }
  }



}
