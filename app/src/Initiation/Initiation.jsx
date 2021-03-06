import React, { useEffect, useRef, useState, Fragment } from "react";
import { ProfileContainer, Liner, MRow, BlackButton } from "@/_styles/basic";
import {
  EmptyToadContainer,
  ToadContainer,
  HeaderIcon,
  HeaderName,
  Qr,
  QRSpace,
  Admit,
  BottomLine,
  SporeContainer
} from "./styles";
import { authenticationService, toadService } from "@/_services";
import { web3Service } from "../_services/web3.service";
import chroma from "chroma-js";
import { createCanvas } from "canvas";
const qr65 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAAklEQVR4AewaftIAAAxBSURBVO3BgZFjC2gAwYHa1Iia4HAEfymjZ1nam+6YYpAk6X8pkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6eCHDxPNP2mKVTSrKd4mmreY4qNEs5piFc1qio8RzWqKt4nmnzTFx0gkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6+OELTfFVovk60egLRLOa4hFTrKJ5xBSPmOKrRPNVEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg5++KOieYspPko0j5hiFc3LpnibaL5ONL+a4qNM8VWieZsp/pxEkqSDRJKkg0SSpINEkqSDRJKkg0SSpINEkqSDRJKkgx/0NaZYRfOIaFZTvEU0bzPFV4nmbaZYRfOIKfQFEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg5+0J8yxSqa1RQfY4pHRLOK5hFTrKZYRfOrKVbRrKZYRbOaQv+QRJKkg0SSpINEkqSDRJKkg0SSpINEkqSDRJKkgx/+qCn+nGhWUzwimkdM8TGm+CjRrKZ42RSPmGIVzWqKjzGFXpBIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknSQSJJ08MMXikb/x6ZYRfOyaFZTrKJZTbGKZjXFKprVFKtofjXFKprVFKtoVlOsollN8Yho9H8okSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6eCHDzOFPkA0qylW0bwsmtUUq2hWU7xNNC+L5qNE8zZT6P9ZIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknSQSJJ0kFMMfxB0bzFFKtoVlOsovlzpnibaB4xxdtE87IpVtGsplhF81WmeEQ0bzPFx0gkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6+OHDRPOIKT7GFKtoVlM8IprVFI+I5mXRrKZ4xBSraFZTrKJ5i2geEc1qio8SzVtMsYpmNcVXSSRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTqIKQb9p2h+NcUqmtUUj4jmEVO8RTSrKd4mmtUUq2j0H6Z4RDRfZYpVNKspPkYiSdJBIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknSQUwxfJBoVlOsollN8TGiecQUj4hmNcUqmreY4hHRfJQpfhXNaopHRPNRpniLaFZTrKJ5xBQfI5Ek6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOnghy8UzceI5hFTrKJ5RDSPiGY1xVeZYhXNaopVNG8RzSOmWEXzNtGspvhVNKspVtE8YoqvkkiSdJBIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknTww4eZ4hHRvMUUj4jm60zxsmhWU6yiWU2ximY1xdtE8xZTrKJZTfFRovnVFI+YYhXNn5NIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknQQUwwfJBr9hylW0aymWEWzmuItollNsYrmbab4GNGspnhENKspVtE8YoqXRbOa4hHRrKb4GIkkSQeJJEkHiSRJB4kkSQeJJEkHiSRJB4kkSQeJJEkHMcXwZaJ5xBSraH41xdtEs5piFc3HmOIR0XydKfQfollN8bJoHjHFKprVFF8lkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6eCHP2qKVTQvi+YRU6ymWEWzmmIVzSOm+FU0j5jiEdE8YopHRPOrKR4RzUeZYhXNW0yximY1xSqa1RQfI5Ek6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgphi+TDSPmOJjRPOIKVbRrKZ4RDQvm2IVzSOmWEXzNlP8k6JZTfEW0aymWEWzmuKrJJIkHSSSJB0kkiQdJJIkHSSSJB0kkiQdJJIkHSSSJB3EFMMHiWY1xSqaR0zxsmg+yhT/pGhWU6yiWU3xFtGsplhF81GmWEXzFlOsonmbKT5GIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknSQSJJ0kFMMXyZaN5min9SNKspVtG8bIo/KZqXTbGKZjXFI6L5KFN8lWhWU3yMRJKkg0SSpINEkqSDRJKkg0SSpINEkqSDRJKkg0SSpIOYYvgy0aymWEWzmuJX0XydKd4mmreY4hHRPGKKjxHNI6b4KNH8OVN8lUSSpINEkqSDRJKkg0SSpINEkqSDRJKkg0SSpINEkqSDmGL4g6JZTbGK5mVTrKJZTbGK5hFTPCIa/YcpVtH8aopVNKspVtGsplhFs5riY0SzmuKflEiSdJBIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknQQUwwfJJrVFI+IZjXFy6JZTbGKZjXFKpq3meJl0TxiilU0f84UbxPNI6ZYRfMWU6yieZspPkYiSdJBIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBTDF8kGj+nClW0Txiio8SjV4wxcuiWU3xiGgeMcUjonmLKf5JiSRJB4kkSQeJJEkHiSRJB4kkSQeJJEkHiSRJB4kkSQcxxfBlollN8TGiecQUj4hmNcVbRPOIKVbRrKZ4m2heNsUqmo8yxSOiWU3xq2hWU6yieZspPkYiSdJBIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknSwQ8fJpqPEs2vplhN8Yho3iaa1RQfI5rVFPoPU7xNNI+YYhXNr6ZYRfOIKf6cRJKkg0SSpINEkqSDRJKkg0SSpINEkqSDRJKkg0SSpIMfvtAUj4jmLaJ5xBSraFZTrKJZRfOyKf6kaFZTrKL5KtGspnhENKspfhXNaoq3iWY1xcdIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOvhBv5riZVOsonnEFG8zxSqaX0WzmuLrTLGK5mXRrKZ4RDRvE81bTLGKZjXFPymRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTp4Ae9JJq3ieYRU6ymeMQUv4pmFc1qilU0qykeEc0jpniLaN4mmreJ5mVTrKL5JyWSJB0kkiQdJJIkHSSSJB0kkiQdJJIkHSSSJB0kkiQdxBSDvkI0qyneJpqXTfGIaFZTPCKa1RRvEc0jpnhENI+Y4i2iecQUq2hWU3yVRJKkg0SSpINEkqSDRJKkg0SSpINEkqSDRJKkg0SSpIMfPkw0/6QpVlM8IppHTPGyaD5KNI+IZjXFKppfTfGIaB4xxSqaR0SzmuItollNsYpmNcXHSCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTr44QtN8VWi+ZOiedkUq2jeZoq3ieZjTPF1pniLKR4RzWqKr5JIknSQSJJ0kEiSdJBIknSQSJJ0kEiSdJBIknTwwx8VzVtM8TbRvM0Uq2hWU/wqmtUUq2geEc1qikdM8bJoVlOsovko0XyMaB4xxSqa1RQfI5Ek6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOngB/0pU6yiWUWzmmIVza+meMQUj5jibaJZTfGyaFZTfJ1oPsYUj5jiqySSJB0kkiQdJJIkHSSSJB0kkiQdJJIkHSSSJB0kkiQd/KB/zhRvM8XLonmbKVbRrKZ4RDS/mmIVzSOiWU2xiuYRU/w50aym+BiJJEkHiSRJB4kkSQeJJEkHiSRJB4kkSQeJJEkHiSRJBz/8UVP8OVOsollN8TbR/GqKR0yxiuYRU3yVKd4mmkdMsYrmZVPoBYkkSQeJJEkHiSRJB4kkSQeJJEkHiSRJB4kkSQeJJEkHP3yhaPQBollN8atoPko0j5jiY0TziClW0aymWEWzmmIVzcui0X9IJEk6SCRJOkgkSTpIJEk6SCRJOkgkSTpIJEk6SCRJOogpBkmS/pcSSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIOEkmSDhJJkg4SSZIO/gdbGocFKZWgCQAAAABJRU5ErkJggg==";
import ticketTemplate from "../assets/ticketTemplate.png";
import { Paragraph, Header, Modal } from "../_styles/basic";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  Color,
  SphereGeometry,
  PointLight,
  AmbientLight,
  MeshToonMaterial,
  TextureLoader,
  RepeatWrapping,
  ObjectLoader
} from "three";
import { Loading } from "./Loading";
import smoke from "./smoke.png";
import toad from "./yellowDog.json";
import { CContainer } from "../_styles/form";
import { uiService } from "../_services";
let scene;
let material;
let spore;
let shroom;
const yes = ["YA", "SI", "HAI", "OUI", "DA", "JA", "TAK", ""];

const Initiation = ({ history }) => {
  let rendgar = null;
  const sixFour = useRef(null);
  const [IMG, setIMG] = useState();
  const [currentUser, setCurrentUser] = useState(
    authenticationService.currentUserValue
  );
  const [toads, setToads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [booped, setBooped] = useState(false);
  const [QR, setQR] = useState("");

  const [yesText, setYesText] = useState("YA");

  const head = useRef();
  const signedNDA = authenticationService.currentNDAValue;

  useEffect(() => {
    if (!loading) setLoadingMessage("");
  }, [loading]);

  const createToad = () => {
    setLoading(true);
    setLoadingMessage("Minting your toad...");
    toadService.createToad("beta", "meiosis").then(toad => {
      setQR(toad.qrPng);
      getZeToads();
      setLoading(false);
    });
  };

  // should just get your init or something
  const getZeToads = () => {
    toadService
      .getYours()
      .then(toads => {
        console.log(toads);
        setToads(toads);
        setQR(toads[0].qrPng);
        setCurrentUser({ ...currentUser, beta: true });

        web3Service.getURI(toads[0].id).then(uri => {
          const { r, g, b } = JSON.parse(uri);
          material.color = new Color(`rgb(${r},${g},${b})`);
          shroom.children[0].material.color = new Color(`rgb(${r},${g},${b})`);
          shroom.children[2].material.color = new Color(`rgb(${r},${g},${b})`);
        });
      })
      .catch(e => {
        setCurrentUser({ ...currentUser, beta: false });
        setLoading(false);
      });
  };

  useEffect(() => {
    web3Service.connect();
    getZeToads();
  }, []);

  useEffect(() => {
    if (!currentUser.beta) return;
    const w = 500;
    const h = 500;
    scene = new Scene();
    const camera = new PerspectiveCamera(75, w / h, 0.1, 1000);
    const renderer = new WebGLRenderer();
    renderer.setSize(w, h);
    const threetainer = document.getElementById("three");
    threetainer.appendChild(renderer.domElement);

    const geometry = new SphereGeometry(3, 32, 32);
    const texture = new TextureLoader().load(smoke);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(100, 100);
    material = new MeshToonMaterial({ color: 0x00ff00, map: texture });
    spore = new Mesh(geometry, material);
    scene.add(spore);
    camera.position.z = 5;

    const ambientLight = new AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const loader = new ObjectLoader();
    shroom = loader.parse(toad);

    var s = 1.5;
    shroom.scale.x = s;
    shroom.scale.y = s;
    shroom.scale.z = s;
    shroom.position.y += -1;
    scene.add(shroom);

    const pointLight = new PointLight(0xffffff, 2, 0);
    pointLight.position.set(1, 1, 1);
    scene.add(pointLight);

    const animate = () => {
      rendgar = requestAnimationFrame(animate);
      spore.rotation.y += 0.001;
      shroom.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    threetainer.querySelector("canvas").style.width = "50%";
    threetainer.querySelector("canvas").style.height = "50%";
    return () => {
      window.cancelAnimationFrame(rendgar);
      threetainer.querySelector("canvas").remove();
    };
  }, [currentUser.beta]);

  // should stop looping when the toad is booped
  useEffect(() => {
    if (toads.length === 0) return;
    if (booped === true) return;
    const intervalId = setInterval(call, 1000);

    function call() {
      // this just returns the boops
      web3Service.getToad(toads[0].id).then(hi => {
        setLoading(false);
        if (hi === false) {
          console.log("this is false");
        } else {
          console.log("this is true");
          clearInterval(intervalId);
          setBooped(true);
          scene.remove(spore);
        }
      });
    }
    return () => clearInterval(intervalId);
  }, [toads]);

  useEffect(() => {
    if (!sixFour.current) return;
    const canvas = createCanvas(576, 1120);
    const context = canvas.getContext("2d");
    console.log(ticketTemplate);
    const t = new Image();
    t.onload = function() {
      context.drawImage(t, 0, 0);
      const qr = new Image();
      qr.onload = function() {
        context.drawImage(qr, 88, 360);
        setIMG(canvas.toDataURL());
      };
      qr.src = qr65;
    };
    t.src = ticketTemplate;
  }, [sixFour]);

  useEffect(() => {
    if (toads.length > 0) return;
    let counter = 0;
    let req;
    const loopYes = t => {
      setYesText(yes[counter]);
      if (counter < yes.length - 1) {
        counter++;
      } else {
        counter = 0;
      }
      req = setTimeout(() => loopYes(), 2000);
    };
    loopYes();
    return () => clearTimeout(req);
  }, [toads]);

  useEffect(() => {
    if (loading) return;
    if (!head.current || beta) return;
    let req;
    let counter = 0;
    const f = chroma.scale(["yellow", "red", "black"]);
    const dumbLoop = () => {
      const animate = () => {
        req = window.requestAnimationFrame(animate);
        head.current.style.transform = `rotate3d(0, 1, .1, ${counter /
          (1.5 + Math.sin(counter * 0.01) * 0.5)}deg)`;
        const colorWave = 0.5 * (Math.sin(counter * 0.01) + 1);
        document.getElementById("smiler_cta").style.color = f(colorWave);
        counter++;
      };
      animate();
    };
    setTimeout(
      () => (document.getElementById("smiler_cta").style.display = "block"),
      3000
    );
    dumbLoop();
    return () => {
      window.cancelAnimationFrame(req);
    };
  }, [currentUser]);

  const { beta } = currentUser;
  return (
    <Fragment>
      {loading && (
        <Liner>
          <Loading loadingMessage={loadingMessage} />
        </Liner>
      )}
      {!loading && !beta && (
        <Fragment>
          <CContainer>
            <Liner>{`${currentUser.raptorname}`}</Liner>
            <Liner>Would you like a BetaToad?</Liner>
            <Liner>It will get you into Monarch on May 8</Liner>
            <div
              style={{
                transform: "rotate(90deg)",
                gridColumn: "2/4",
                width: "50%",
                cursor: "pointer"
              }}
            >
              <Liner
                onClick={() => {
                  if (!signedNDA) {
                    return uiService.showModal(
                      <div
                        onClick={e => {
                          e.stopPropagation();
                          history.push("/ch2");
                          uiService.hideModal();
                        }}
                        style={{
                          textAlign: "center",
                          fontSize: "1.4rem",
                          padding: "2rem",
                          cursor: "pointer"
                        }}
                      >
                        ay! you must go through chapter2 before minting :)
                        <BlackButton>LETS GO</BlackButton>
                      </div>
                    );
                  }
                  createToad();
                }}
                id="head"
                ref={head}
                style={{
                  border: "7px white solid",
                  borderRadius: "50%",
                  fontSize: "100px",
                  textAlign: "center"
                }}
              >
                :)
              </Liner>
            </div>
            <div
              id="smiler_cta"
              style={{
                display: "none",
                textAlign: "center",
                fontSize: "1.7rem",
                gridColumn: "1/4"
              }}
            >
              click the smiler!
            </div>
          </CContainer>
        </Fragment>
      )}
      {!loading && toads.length > 0 && (
        <SporeContainer id="three"></SporeContainer>
      )}
      {/* {!loading && ( */}
      <ProfileContainer>
        {!loading && beta && booped && (
          <Fragment>
            <CContainer>
              <Liner>{`hi ${currentUser.raptorname}`}</Liner>
              <Liner>This is your Alpha Toad :)</Liner>
              <Liner>Sprouted from the Mycelium blockchain</Liner>
              <Liner>Stay tuned for more info</Liner>
            </CContainer>
          </Fragment>
        )}
        {!loading && beta && !booped && (
          // <Fragment>
          //   <CContainer>
          //     <Liner>{`hi ${currentUser.raptorname}`}</Liner>
          //     <Liner>see you there :)</Liner>
          //   </CContainer>
          // </Fragment>
          <ToadContainer>
            {/* <HeaderName>{emailRef.current}</HeaderName> */}
            {/* <HeaderIcon>!</HeaderIcon> */}
            <QRSpace style={{ background: "white" }}>
              <Qr src={QR} />
              <Admit>
                ADMIT <p>2</p>
              </Admit>
            </QRSpace>
            <div style={{ gridArea: "toadman", padding: "2rem" }}>
              <BottomLine> MONARCH </BottomLine>
              <BottomLine>MAY 8</BottomLine>
            </div>
          </ToadContainer>
        )}
        {/* {!QR && (
            <EmptyToadContainer>
              <Paragraph>CHAPTER 1</Paragraph>
              <Paragraph>VALENCIA ROOM</Paragraph>
              <Paragraph>NOV 2</Paragraph>
              <Liner className="last" style={{ textAlign: "center" }}>
                WOULD YOU LIKE TO JOIN?
              </Liner>
              <MRow>
                <WhiteButton onClick={createToad}>{yesText}!</WhiteButton>
              </MRow>
            </EmptyToadContainer>
          )}
          {QR && !booped && (
            <ToadContainer>
              <HeaderName>{currentUser.raptorname}</HeaderName>
              <HeaderIcon>!</HeaderIcon>
              {!booped && (
                <QRSpace>
                  <Qr src={QR} />
                  <Admit>
                    ADMIT <p>2</p>
                  </Admit>
                </QRSpace>
              )}
              <div style={{ gridArea: "toadman", padding: "2rem" }}>
                <BottomLine> VALENCIA ROOM </BottomLine>
                <BottomLine>NOV 2</BottomLine>
              </div>
            </ToadContainer>
          )} */}
      </ProfileContainer>
      {/* )} */}
    </Fragment>
  );
};

export { Initiation };
