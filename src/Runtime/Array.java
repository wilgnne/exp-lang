package Runtime;

import java.util.ArrayList;

public class Array {
  private ArrayList<Integer> array;

  public Array() {
    this.array = new ArrayList<Integer>();
  }

  public Array push(int value) {
    this.array.add(value);
    return this;
  }

  public int length() {
    return this.array.size();
  }

  public String string() {
    return this.array.toString();
  }

  public void set(int index, int value) {
    this.array.set(index, value);
  }

  public int get(int index) {
    return this.array.get(index);
  }
}
