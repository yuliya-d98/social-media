import { create } from 'react-test-renderer';
import ProfileStatus from './user/profile-status';

describe('profileStatus component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status="hello" />);
    const instance = component.getInstance();
    expect(instance?.state?.status).toBe('hello');
  });
  test('after creation paragraph should be displayed', () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    const paragraph = root.findByType('p');
    expect(paragraph).not.toBeNull();
  });
  test('after creation input should not be displayed', () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    expect(() => {
      root.findByType('input');
    }).toThrow();
  });
  test('after creation paragraph text should contain correct status', () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    const paragraph = root.findByType('p');
    expect(paragraph.children[0]).toBe('hello');
  });
  test('input should be displayed in editMode instead of paragraph', () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    const paragraph = root.findByType('p');
    paragraph.props.onDoubleClick();
    const input = root.findByType('input');
    expect(input.props.value).toBe('hello');
  });
  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="hello" updateStatus={mockCallback} />);
    const instance = component.getInstance();
    instance?.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
