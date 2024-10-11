import Image from 'next/image';

const ContactButtons = () => {
  return (
    <div id="button-contact-vr" className="fixed bottom-0 z-50">
      <div id="gom-all-in-one">
        {/* Nút Zalo */}
        <div id="zalo-vr" className="button-contact">
          <div className="phone-vr">
            <div className="phone-vr-circle-fill"></div>
            <div className="phone-vr-img-circle">
              <a target="_blank" href="https://zalo.me/0912601896" rel="noopener noreferrer">
                <Image
                  src="https://luathungbach.vn/wp-content/plugins/button-contact-vr/img/zalo.png"
                  alt="Chat Zalo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
        {/* Nút Điện thoại */}
        <div id="phone-vr" className="button-contact">
          <div className="phone-vr">
            <div className="phone-vr-circle-fill"></div>
            <div className="phone-vr-img-circle">
              <a href="tel:0912601896">
                <Image
                  src="https://luathungbach.vn/wp-content/plugins/button-contact-vr/img/phone.png"
                  alt="Gọi điện thoại"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
        {/* Số điện thoại */}
        <div className="phone-bar phone-bar-n">
          <a href="tel:0912601896">
            <span className="text-phone">0912601896</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactButtons;
