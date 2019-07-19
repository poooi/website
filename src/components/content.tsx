import React, { lazy, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TypeCat } from './type-cat'

import poi from '../assets/poi.png'

const Download = lazy(() => import('./download'))
const IconLoader = lazy(() => import('./icon-loader'))

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: normal;
`

const Name = styled.span`
  font-size: 100px;

  @media screen and (min-width: 768px) {
    font-size: 200px;
  }
`

const Description = styled.div`
  font-size: 36px;
  text-align: center;
  white-space: pre-line;

  @media screen and (min-width: 768px) {
    font-size: 48px;
  }
`

const Image = styled.img<{ show: boolean }>`
  transition: 0.3s;
  opacity: ${props => (props.show ? 1 : 0)};

  position: absolute;
`

const ImageContainer = styled.div`
  position: relative;

  height: 150px;
  width: 150px;

  img {
    height: 150px;
    width: 150px;
  }

  @media screen and (min-width: 768px) {
    width: 300px;
    height: 300px;

    img {
      height: 300px;
      width: 300px;
    }
  }
`

const Logo = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <ImageContainer>
      <Image
        show={!isLoaded}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAC/VBMVEUAAAA/MC4AAAA1Lis2Liv/++ft4s/y5dKTg2/Wx7Xr3ssvJSLPwq7g1MChk3qLfGg3KicpHhz//e316dbo3Mm+sKH27tmZiXNkWVV1Wk2rn5MvJyfazbwtBQOXfWqunpE3Lis2LSn59Of76NHLsJeejX+PfmzU0tLMvKuol4qEcWYAAADc08THva61q6E3LywxLCjj2MW7rJeajHVEAADGtqY6MjH99d9kUkf38eKDbFy9tK3k2sk2LSs2LSs2JyTpzrGwoZGOg3orHBmVioCqkn+FZFbd3NyhnJs9NjKLemnn3szh18WaiX+zo5eup6U6Mi+Uhn02LSo3KCEGAADn5OS2s7KblJKom4R2ZVh8a1ZMQ0JaS0RvZmBaPzK0ppi2nIRvVUf8+vfr4894YlHy6taLgHvFvbnRybihl5PIwsCekobQycWJeG48My/Nycjx17mrp6awoIfx6tfEuKusnoU2JSbHwsFbMSCfkYfXzbrZ0czh2tY2LSrTy8i/tKZ8aWA2Lis2LirCqpNoSTtOKyHXvaU2AAWKeWS8oopDMy6Dd3Hp4N1cTkuBbGOZjog1LSoAAAA2LSp/c2yKcGA2NUTw3sh7UzZUHgymjHlBGxh5NBfHvKz18e++tbNrWVPw7eqml402LStpU04ZAAAOAAB7CgDt2b9OOjnNxLuTgEx+OSuzqJt2aWVhNzD07+MkDABpUEA/ODUQAANjT0x+amI6DwWYhnx0WVGKWltDJCKAdHROIx+dkIxzX1i8rqE9AABECh41LSo5MS358Ns3Lyz99eD/9+KzpoyrnoT379n67Nr/8d/77ds9NjP979yxo4muoIY7MzD68t346thAOjf/9OGmmX7///4uJiTcz7j/+eTDtp4bCwj//+kZEBu3qpAvKzslHiAiFhPHu6eFdmIgHzIRAAGVak4FCR6oPxsJAA/14cr748h7bWVPS0+jbjs+JiSfKADo4teDRgCIAACgeFWshEufTi2VRAmxTwGSMQDEgDqtVjYvMzAcT5xeAAAAwnRSTlMABP79+v7+/fj+/hX+/f39Kwv+/v38+/v7+uA2+/v59fFC/v7+/f38+vj29Onl4loh/v7+/fz8+vr49/Ty08VL/f39/fz8/Pv7+/bz8O7t7OffiWZQ/v7+/v79/fz7+/r4+PX09O/u7e3t6OTf3pX+/v7+/fr6+vf39O/s6+ro6N2rnv7+/v39+/r57+7u69i0p3j+/v79/f35+Pjx7unn5dS8oH9t/v39+fj19PHw6+ve0ci4tbCbfff2y8O9vLCmlzaYQlcAAAjYSURBVEjHtZcFcBs5FIYbmZPYSRpmZmZm5rSBhpmpzMxMx2U+Zmbwer1mO6bY4aZJU+ZjmNPacabXzLWZm7l/xuv16n16T0/S6nne/yU9qP+GzfoxN83YmhgYmMw8mzuqZxu4cGtCfFFRfMKR3mJbkzniuIntwgQiohWKX4jxC53xpjm4TTwCSZRAhCIQIrIjiATYA+F84LNw2Gh7HkVQHGNCKRTMVFSBdwQfJjhDg6exegsJCJMIQVyIAgBwBQApymQSiEyE2WuC0//GGicgzGyFSKGA9tAY1JQt9lycgtM4jiLxtjp6Nuu8ESFGXAFQwwhBhEwtLV28dFFZaRqoEiFMKKLUKVGbl9lsIhEhSoerli5enXV3mAlAVmarL1TWahg8UyGCAWUjaKAmrbP94myq1DOzrMwzM2tf15lWv3V5ubm5m238uw4CMK6GEfkC30sGENV7crxOCJGpAIsyAXi/dYPfGf/DfiODGJs93z9gJLKlPc3p+Dsdpzdt6iw8/HHJ47RmTX2oyBZFVIEsz/3tTdEykr/voRYWG8NIkT3tgyxsMDIvLpo0H4rk8jD2goEG0o3A5KgmT1MgPyCaRBqJzOuyD+tZYLPZ33/BAgs2i8WTYRhbxoNiyTDSw29stZweJEt++KqjsLBwwcGD7S1b1o00QWKLTVdArn+BjY0/ZKHYLB68ymTwwuNhsoCL01um5NsCerQLjKjxvRaM5LfFpqdrXaSNX9wC9giGYYOQhWriwe9pnAfjoH1iC7ec7ScnyYMkDKYGM5WxKTx23OY49ohFTxOvJ2/QIs6CpRE7r4AMnctkpjw2rkgS2f1Tg3klPusMJwwH6PRgmiEvejnbhUSaH/3egcPRqoC2+S6xZiQtjZ3M0WezWbSxIcMBKNqQ+4UgGPXFBga3v7+fG1puyn7o4tLo4qI6dXbDORfV+sPRI7GOME0sHp4wb0sKeaI/1NLSkjrZ/MH3JdoxX/rAUsLh9FmakciGPI2XpnV+XRZYy5a4kfY1dEzG1siumcPplxjd37dvVepHBpDTZjtxlRU1tNkLkw3QSWy2jIWZbW63kbEj/ZaP5PnmU3gUstnAxNCYD1XSJ+FWjRKI0iKDeSbTS8SWOcoE78ApCZ+gB5MteIO5+U0tLIvlFmSyV8O7K4c4HK512CSHcWhZX5+kYlSKEtBiiGnhhdIIKTiJsZZz4dAlMCWOUUOGQyFjnGWcnGP19gwJo/raTzsnlzUzJFzJ5Cjc8UjvPJ2OINnDVhQ2O9hS0sfllvdzY44z8BRyuRyqwxIHe6MdJ65du7bGY48Hh1FO1cAJerhr+DGJRxXgbTYPCzficPugOHt2h3L6NHeW1klLHEDYy2t2XHs5lFrJCWW438RhOGgtbFCkGK6Gk6jvgcO4qBkxEi4uyUrrXa6ubtb2U2GveIRQG8YYyXVAyiSgTsbTsLGTAphDNsQIwlB95R5uFaFjEg5U+fHtrvSBl3alZ4TVMqjWnMqUNCCCMMFWBxeBmuWDZpx+j0kJF0fGYgYMa/v7GZZ7KivT3dLN5dggJjZzt6/d0WDtYA2YKHxDOuvg1Ck7UvAYNWfCSCLptzQyMlqTTkvxyYlxSB+ibXegYWJyblwu2TQZ7NyblJR07CbyGBzkax45sExSncJLq6hsdkjfu337AC05mfaSKx8zcw+nOVIz3jrx1svUvIr6224vuC2JASItDGVycS19iLuSCp5n1e1s2HX71q1bFLlcfyLEVMkX8usWlVk9+u33Xx/88WacYZJbrRv9dj2AJ5CxFjb+OidnD9VqFbAim4c6uHp5pPjEZBgd86YJ+XK+gOqpWvTjL2/eu/ebg4UwKWNHvatrPYhANgbp5vmjK6vGR6VqkWEyw13f27P0zq+/P7r3wFIo5suVXktVZbtv/HLj3olYpWBXxt4X+K45IFv04czrr1dKQKUoqk7plyTrO6pUGQ9+uvHzz94CPp8v5nt7Nj7/6o0Hr3jzxWJ9D2s7kleqSKE+alBy4XMNXIwQ8ONF/TpjKIRS0Anj/PPGo8pgpVwo5Aso3rFLd4e94igXCG/dJusLvWrHp0DqFhs7+WfTqwSfOZSJUg296ZT8zEzrH1+NognkMF9ioUBoF26+IlgAx7DELSTcZxiAmjo7Ckn5nXZP6yUgRPxUHK1Y6UjByOYr3l67gizgCyFrCntQKgVKgVAsXrL3S2DvfqfBiyLASGaf6bbGcxqYgKibzZSmAoGpHFrL+aZCsZLuJZbL+WKBQPyS2wsAXLfya3NwVQrE4Z/jnHaZbMTjhodNFAXjy/Ghyk2FJHK4oXkIbVCpFFOCvZKtIXr5asT6DTFJ4oFzj58426BrKBFI0xfDKKEjJcWcTqPBBOnbrXBMq1h7CIyOX758+er+ttP1yz7VnXW6lOE0ioBq73C7YDN9ir65uTvdzM48f+2i1tOxAecKa8BdHAarS6uA7ozXvYkQIgGnRcNR6R7WPjFROw3n19Wm7LfpXp3V2R3Q2hPgWS26exWP+4DVUQg8DhvEw8A1tLo8xEjiA2qEcseAtrbuTasPrO9wfCPWptvT6vqLL74IOrLeh0vzibIARQkaWj0eNbkyCtQpKe5pBZs7uzsLfdZuOrUpv7vx7Blw/eZ1e/vif7La6SJoaAS9qYgaBXbzX3PMXFxw6OD+sN13rVrz3+1oVJ3tuHOnWt07uyLRZFzrW6oeV69aYfpawYYDhVWvf7HG/iYsStSgU6U65ffG80eh8Wxab6vWN550lDluZVTjYwWu3g+7j4iypTAX9htUqsb1Hxvo2Fk0k8jUaQoMXxlGEeZf2nCYoiv72kpLY3UDnkXDCUNmyj+RSCqVojg2LVEquN+baPzvlWfgRugcep8tAiyVii49vW4N2srEccITJEQR9IgxNHk6nnge2hEgrxN+jxe9gc8s2PFW520b8TIdOoTCc48gTlsTdXvhmXhQ4LZ4J0hp+nCK3xYYhDfM/f+JXpBzYPFzzxUHOhubzDydG673lAdz62BG8/4X/Q1kiVhmadIOFQAAAABJRU5ErkJggg=="
      />
      <Image src={poi} show={isLoaded} onLoad={() => setIsLoaded(true)} />
    </ImageContainer>
  )
}

export const Content = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Title>
        <Logo />
        <Name>{t('name')}</Name>
      </Title>
      <Description>
        <TypeCat text={t('description')} />
      </Description>
      <Suspense fallback={<div />}>
        <IconLoader />
        <Download />
      </Suspense>
    </Container>
  )
}
