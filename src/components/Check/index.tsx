import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(10px);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CheckboxContainer = styled.div`
    width: 600px;
    height: auto;
    border-radius: 12px;
    background: #34495e;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 20px;
    color: #ffffff;
`;

const DeviceWrapper = styled.div`
    width: 100%;
    margin-top: 20px;
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const CameraPreview = styled.video`
    width: auto;
    height: 200px;
    background: #000000;
    border-radius: 10px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 12px 0;
    background: #27ae60;
    margin-top: 20px;
    border: 0;
    border-radius: 10px;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
`;

const SelectWrapper = styled.div`
    flex: 1;
    margin-left: 20px;
    flex-direction: column;
`;

const Select = styled.select`
    width: 100%;
    margin-bottom: 12px;
    border-radius: 10px;
    padding: 12px;
`;

const Check = ({ onClose }: { onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        alert('Failed get user media');
        console.error(err);
      });

    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        setCameras(devices.filter((device) => device.kind === 'videoinput'));
        setSpeakers(devices.filter((device) => device.kind === 'audiooutput'));
        setAudioInputs(devices.filter((device) => device.kind === 'audioinput'));
      });
  }, []);

  return (
    <Container>
      <CheckboxContainer>
        <Title>Check your camera and mic</Title>
        <DeviceWrapper>
          <CameraPreview ref={videoRef} autoPlay playsInline />
          <SelectWrapper>
            <Select>
              { cameras.map((camera) => <option key={camera.deviceId}>{camera.label}</option>) }
            </Select>
            <Select>
              { speakers.map((speaker) => <option key={speaker.deviceId}>{speaker.label}</option>) }
            </Select>
            <Select>
              { audioInputs.map((audioInput) => (
                <option key={audioInput.deviceId}>{audioInput.label}</option>
              ))}
            </Select>
          </SelectWrapper>
        </DeviceWrapper>
        <SubmitButton type="button" onClick={onClose}>Join</SubmitButton>
      </CheckboxContainer>
    </Container>
  );
};

export default Check;
